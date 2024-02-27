import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageNav from "../MyPageNav/MyPageNav";
import Loading from "../Loading/Loading";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { RightContent, InfoText } from "./OrderHistoryComponentStyle";

import {
  Container,
  RightContentArea,
  Title,
  BottomContent,
  ItemArea,
  CenterContent,
  ItemTitle,
  ItemDescription,
  EmptyInfomation,
} from "../ShoppingBasketComponent/ShoppingBasketComponentStyle";

import { OrderDetail } from "../../types/PortOneType";

const OrderHistoryComponent = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrderList = async () => {
      setIsLoading(true);
      const db = getFirestore();
      const auth = getAuth();
      const userUID = auth.currentUser?.uid;

      if (userUID) {
        const userRef = doc(db, "users", userUID);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const orderList = userData.orderList || [];

          if (orderList.length > 0) {
            const response = await axios.get(
              `https://us-central1-commerce-204d5.cloudfunctions.net/getMultiplePaymentInfo?${orderList
                .map((imp_uid: string) => `imp_uid[]=${imp_uid}`)
                .join("&")}`,
            );
            setIsLoading(false);
            setOrderDetails(response.data.response);
          }
        } else {
          setIsLoading(false);
          console.log("No such document!");
        }
      }
    };

    fetchOrderList();
  }, []);

  console.log(orderDetails);

  return (
    <Container>
      <MyPageNav />
      <RightContentArea>
        <Title>주문내역</Title>
        <BottomContent>
          {orderDetails.length > 0 ? (
            orderDetails.map((order, index) => (
              <ItemArea key={index}>
                <CenterContent>
                  <ItemTitle>{order.name}</ItemTitle>
                  <ItemDescription>
                    주문자 명 : {order.buyer_name}
                  </ItemDescription>
                  <ItemDescription>
                    결제 금액 : {order.amount}원
                  </ItemDescription>
                </CenterContent>
                <RightContent>
                  <ItemDescription>
                    전화번호 : {order.buyer_tel}
                  </ItemDescription>
                  <ItemDescription>
                    배송지 주소 : {order.buyer_addr}
                  </ItemDescription>
                  <ItemDescription>결제상태 : {order.status}</ItemDescription>
                </RightContent>
              </ItemArea>
            ))
          ) : (
            <EmptyInfomation>주문내역이 없습니다.</EmptyInfomation>
          )}
        </BottomContent>
      </RightContentArea>
      {isLoading && <Loading />}
    </Container>
  );
};

export default OrderHistoryComponent;
