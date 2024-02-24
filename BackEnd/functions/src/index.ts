import * as functions from "firebase-functions";
import cors from "cors";
import axios from "axios";

const corsHandler = cors({ origin: true });

export const getToken = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    const { imp_key, imp_secret } = functions.config().iamport;

    try {
      const tokenResponse = await axios.post(
        "https://api.iamport.kr/users/getToken",
        {
          imp_key,
          imp_secret,
        },
      );

      response.json(tokenResponse.data);
    } catch (error) {
      console.error("getToken error:", error);
      response.status(500).send("Internal Server Error");
    }
  });
});
