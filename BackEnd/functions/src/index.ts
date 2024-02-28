import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";
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
