import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";
const corsHandler = cors({ origin: true });

const apiKey = process.env.IAMPORT_API_KEY;
const apiSecret = process.env.IAMPORT_API_SECRET;

export const getIamportToken = functions.https.onRequest(
  (request, response) => {
    corsHandler(request, response, async () => {
      try {
        const axiosResponse = await axios.post(
          "https://api.iamport.kr/users/getToken",
          {
            imp_key: apiKey,
            imp_secret: apiSecret,
          },
        );

        const { access_token } = axiosResponse.data.response;
        response.send({ token: access_token });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("아임포트 토큰 가져오기 에러: ", error.response?.data);
          response
            .status(500)
            .send("아임포트 토큰 요청 중 에러가 발생했습니다.");
        } else {
          console.error("알 수 없는 에러 발생: ", error);
          response.status(500).send("알 수 없는 에러가 발생했습니다.");
        }
      }
    });
  },
);
