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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.pass,
  },
});

export const checkFundingDeadlines = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const querySnapshot = await db
      .collection("fundingItems")
      .where("deadLine", "<", now)
      .get();

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const mailPromises = querySnapshot.docs.map((doc) => {
      const { name, deadLine } = doc.data();
      console.log(`Preparing email for expired funding item: ${name}`);

      const mailOptions = {
        from: "fundit@gmail.com",
        to: "ckdgus5189@gmail.com",
        subject: `${name} 펀딩 마감일이 지났습니다`,
        text: `${name}의 펀딩 마감일이 ${deadLine
          .toDate()
          .toLocaleString()}에 지났습니다.`,
      };

      return transporter
        .sendMail(mailOptions)
        .then((info) => {
          console.log(`Email sent: ${info.response}`);
        })
        .catch((error) => {
          console.error(`Failed to send email for ${name}: ${error}`);
        });
    });

    await Promise.all(mailPromises);
    console.log("All emails processed.");
  });
