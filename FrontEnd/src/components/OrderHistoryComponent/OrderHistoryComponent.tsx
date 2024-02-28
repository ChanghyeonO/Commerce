import React, { useEffect, useState } from "react";
import MyPageNav from "../MyPageNav/MyPageNav";
import Loading from "../Loading/Loading";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "../../api/firebase";

import { RightContent } from "./OrderHistoryComponentStyle";
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
      const userUID = auth.currentUser?.uid;

      if (userUID) {
        const ordersRef = collection(db, "orderItems");
        const userOrdersQuery = query(
          ordersRef,
          where("user_id", "==", userUID),
        );
        const querySnapshot = await getDocs(userOrdersQuery);

        const orders: OrderDetail[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as OrderDetail),
        }));

        setOrderDetails(orders);
        setIsLoading(false);
      } else {
        console.log("로그인된 사용자가 없습니다.");
        setIsLoading(false);
      }
    };

    fetchOrderList();
  }, []);

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
                  <ItemDescription>결제 상태 : {order.imp_uid}</ItemDescription>
                  <ItemTitle>{order.name}</ItemTitle>
                  <ItemDescription>
                    결제 상태 : {order.order_status}
                  </ItemDescription>
                  <ItemDescription>
                    결제 금액 : {order.amount} 원
                  </ItemDescription>
                </CenterContent>
                <RightContent>
                  <ItemDescription>
                    주문자 이름 : {order.buyer_name}
                  </ItemDescription>
                  <ItemDescription>
                    주문자 전화번호 : {order.buyer_tel}
                  </ItemDescription>
                  <ItemDescription>
                    배송지 주소 : {order.buyer_addr}
                  </ItemDescription>
                  <ItemDescription>
                    배송 요청사항 : {order.delivery_request}
                  </ItemDescription>
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
