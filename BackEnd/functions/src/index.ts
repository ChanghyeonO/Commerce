import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as admin from "firebase-admin";
import axios from "axios";
import * as cors from "cors";

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

export const getPaymentInfo = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const impUid = request.query.imp_uid as string;

    if (!impUid) {
      response.status(400).send("imp_uid가 필요합니다.");
      return;
    }

    try {
      const tokenResponse = await axios.post(
        "https://api.iamport.kr/users/getToken",
        {
          imp_key: functions.config().iamport.key,
          imp_secret: functions.config().iamport.secret,
        },
      );
      const { access_token } = tokenResponse.data.response;

      const paymentInfoResponse = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      response.send(paymentInfoResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("결제 정보 조회 중 에러 발생: ", error.response?.data);
        response.status(500).send("결제 정보 조회 중 오류가 발생했습니다.");
      } else {
        console.error("알 수 없는 오류 발생: ", error);
        response.status(500).send("알 수 없는 오류가 발생했습니다.");
      }
    }
  });
});

export const getMultiplePaymentInfo = functions.https.onRequest(
  (request, response) => {
    corsHandler(request, response, async () => {
      const impUids = request.body.imp_uid;

      if (!impUids || !Array.isArray(impUids)) {
        response.status(400).send("imp_uid는 배열이어야 합니다.");
        return;
      }

      try {
        const tokenResponse = await axios.post(
          "https://api.iamport.kr/users/getToken",
          {
            imp_key: functions.config().iamport.key,
            imp_secret: functions.config().iamport.secret,
          },
        );
        const { access_token } = tokenResponse.data.response;

        const queryString = impUids.map((uid) => `imp_uid[]=${uid}`).join("&");
        const paymentInfoResponse = await axios.get(
          `https://api.iamport.kr/payments?${queryString}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        response.send(paymentInfoResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("결제 정보 조회 중 에러 발생: ", error.response?.data);
          response.status(500).send("결제 정보 조회 중 오류가 발생했습니다.");
        } else {
          console.error("알 수 없는 오류 발생: ", error);
          response.status(500).send("알 수 없는 오류가 발생했습니다.");
        }
      }
    });
  },
);

export const cancelPayment = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const { imp_uid } = request.body;

    if (!imp_uid) {
      response.status(400).send("imp_uid가 필요합니다.");
      return;
    }

    try {
      const tokenResponse = await axios.post(
        "https://api.iamport.kr/users/getToken",
        {
          imp_key: functions.config().iamport.key,
          imp_secret: functions.config().iamport.secret,
        },
      );
      const { access_token } = tokenResponse.data.response;

      const cancelResponse = await axios.post(
        "https://api.iamport.kr/payments/cancel",
        {
          imp_uid: imp_uid,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      response.send(cancelResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("결제 취소 중 에러 발생: ", error.response?.data);
        response.status(500).send("결제 취소 중 오류가 발생했습니다.");
      } else {
        console.error("알 수 없는 오류 발생: ", error);
        response.status(500).send("알 수 없는 오류가 발생했습니다.");
      }
    }
  });
});

export const checkFundingDeadLines = functions.pubsub
  .schedule("every 8 hours")
  .onRun(async (context) => {
    const firestoreTimeNow = admin.firestore.Timestamp.now();
    const querySnapshot = await db
      .collection("expiredFundingItems")
      .where("deadLine", "<", firestoreTimeNow)
      .get();

    if (querySnapshot.empty) {
      console.log("마감기한이 지난 문서가 존재하지 않습니다.");
      return;
    }

    const copyAndDeletePromises = querySnapshot.docs.map(async (doc) => {
      const docData = doc.data();
      const newDocRef = db.collection("sendEmailFundingItems").doc(doc.id);

      await newDocRef.set(docData);
      await doc.ref.delete();
    });

    await Promise.all(copyAndDeletePromises);
    console.log("마감기한 지난 문서들이 복사되고 원본이 삭제되었습니다.");
  });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.pass,
  },
});

export const emailSendAlreadyCheckedDeadLine = functions.pubsub
  .schedule("every 4 hours")
  .onRun(async (context) => {
    const deadlineItemsSnapshot = await db
      .collection("sendEmailFundingItems")
      .where("emailSendCheck", "!=", true)
      .get();

    if (deadlineItemsSnapshot.empty) {
      console.log("이미 모든 문서가 처리되었습니다.");
      return;
    }

    const mailPromises: Promise<void>[] = [];

    deadlineItemsSnapshot.docs.forEach(async (deadlineDoc) => {
      const { name, deadLine, salesCount, targetSales } = deadlineDoc.data();

      let fundingResult = "";
      let resultInfoMessage = "";
      if (salesCount >= targetSales) {
        fundingResult = "성공";
        resultInfoMessage = "배송이 시작 될 예정입니다.";
      } else {
        fundingResult = "실패";
        resultInfoMessage = "환불 처리 될 예정입니다.";
      }

      const orderItemsSnapshot = await db
        .collection("orderItems")
        .where("items", "array-contains", deadlineDoc.id)
        .get();

      orderItemsSnapshot.docs.forEach((orderDoc) => {
        const { buyer_email, buyer_name, imp_uid } = orderDoc.data();

        const mailOptions = {
          from: "fundit@gmail.com",
          to: buyer_email,
          subject: `안녕하세요 ${buyer_name}님, ${name} 제품 펀딩이 마감되었습니다.`,
          html: `<img src="https://firebasestorage.googleapis.com/v0/b/commerce-204d5.appspot.com/o/funditLogo%2FFUNDIT%20LOGO.png?alt=media&token=3031a550-f0d8-4e72-8955-5fe935be4283" alt="FUNDIT LOGO"/><br>
            안녕하세요 ${buyer_name}님, FUNDIT입니다.<br>
                   <strong>${name}</strong> 제품의 펀딩이 ${deadLine
  .toDate()
  .toLocaleString()}에 마감되었습니다.<br>
                   해당 제품의 펀딩이 ${fundingResult}하여 ${resultInfoMessage}<br>
                   FUNDIT을 이용해주셔서 감사합니다.`,
        };

        mailPromises.push(
          transporter
            .sendMail(mailOptions)
            .then((info) => {
              console.log(`이메일 발송 완료: ${info.response}`);
              return deadlineDoc.ref.update({ emailSendCheck: true });
            })
            .then(() => {
              if (fundingResult === "실패") {
                const cancelPaymentUrl = functions.config().cancel.payment.url;
                axios
                  .post(cancelPaymentUrl, { imp_uid })
                  .then((response) => {
                    console.log(`결제 취소 성공: ${response.data}`);
                    orderDoc.ref.update({ order_status: "주문취소" });
                  })
                  .catch((error) => {
                    console.error(
                      `결제 취소 실패: ${
                        error.response ? error.response.data : error
                      }`,
                    );
                  });
              }
            })
            .catch((error) => {
              console.error(`이메일 발송 실패: ${name}: ${error}`);
            }),
        );
      });
    });

    await Promise.all(mailPromises);
    console.log("모든 이메일 발송을 완료했습니다.");
  });
