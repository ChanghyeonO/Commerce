import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import MyPageNav from "../MyPageNav/MyPageNav";
import Loading from "../Loading/Loading";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import { Timestamp } from "firebase/firestore";

import {
  RightContent,
  SelectArea,
  CancelDeleteContent,
  CancelButton,
} from "./OrderHistoryComponentStyle";
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
  DeleteButton,
} from "../ShoppingBasketComponent/ShoppingBasketComponentStyle";

import { OrderDetail } from "../../types/PortOneType";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

const OrderHistoryComponent = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();

  const fetchOrderList = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.userId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      console.log("사용자 데이터를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    const isAdmin = docSnap.data().admin === true;
    setIsAdmin(isAdmin);

    let queryToExecute;
    if (user.admin) {
      queryToExecute = query(
        collection(db, "orderItems"),
        orderBy("created_at", "desc"),
      );
    } else {
      queryToExecute = query(
        collection(db, "orderItems"),
        where("user_id", "==", user.userId),
        orderBy("created_at", "desc"),
      );
    }

    const querySnapshot = await getDocs(queryToExecute);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<OrderDetail, "id">),
    }));

    setOrderDetails(orders);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderList();
  }, [user]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setIsLoading(true);
    const orderRef = doc(db, "orderItems", orderId);

    try {
      await updateDoc(orderRef, {
        order_status: newStatus,
      });
      setIsLoading(false);
      Swal.fire(alertList.successMessage("결제 상태 변경이 완료되었습니다."));
      fetchOrderList();
    } catch (error) {
      setIsLoading(false);
      Swal.fire(alertList.errorMessage("결제 상태 변경에 실패했습니다."));
    }
  };

  const handleDelete = async (orderId: string) => {
    setIsLoading(true);
    const result = await Swal.fire(
      alertList.doubleCheckMessage("정말로 주문을 삭제하시겠습니까?"),
    );
    if (result.isConfirmed) {
      const orderRef = doc(db, "orderItems", orderId);

      try {
        await deleteDoc(orderRef);
        setIsLoading(false);
        Swal.fire(
          alertList.successMessage("주문이 성공적으로 삭제되었습니다."),
        );
        fetchOrderList();
      } catch (error) {
        setIsLoading(false);
        console.error("Error deleting order: ", error);
        Swal.fire(alertList.errorMessage("주문 삭제에 실패했습니다."));
      }
    }
  };

  const handleCancelOrder = async (impUid: string, orderId: string) => {
    setIsLoading(true);
    const result = await Swal.fire(
      alertList.doubleCheckMessage("정말로 주문을 취소하시겠습니까?"),
    );

    if (result.isConfirmed) {
      const requestBody = {
        imp_uid: impUid,
      };
      try {
        const response = await axios.post(
          "https://us-central1-commerce-204d5.cloudfunctions.net/cancelPayment",
          requestBody,
        );

        if (response.data.code === 0) {
          const orderRef = doc(db, "orderItems", orderId);
          await updateDoc(orderRef, {
            order_status: "주문취소",
          });
          setIsLoading(false);
          Swal.fire(alertList.successMessage("주문 취소가 완료되었습니다."));
          fetchOrderList();
        } else {
          setIsLoading(false);
          console.error("주문 취소 실패1:", response.data.message);
          Swal.fire(alertList.errorMessage(response.data.message));
        }
      } catch (error) {
        setIsLoading(false);
        console.error("주문 취소 실패2:", error);
        Swal.fire(alertList.errorMessage("주문 취소에 실패했습니다."));
      }
    } else {
      setIsLoading(false);
    }
  };

  const requestOrderCancellation = async (orderId: string) => {
    setIsLoading(true);
    try {
      const orderRef = doc(db, "orderItems", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists() && orderSnap.data().cancel_reason) {
        setIsLoading(false);
        Swal.fire(alertList.infoMessage("이미 취소 요청이 완료되었습니다."));
        return;
      }

      const { value: cancelReason } = await Swal.fire({
        title: "주문 취소 사유",
        input: "text",
        inputPlaceholder: "여기에 사유를 작성해 주세요",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "제출",
        confirmButtonColor: "#5271ff",
        cancelButtonColor: "#2F2F2F",
        inputValidator: (value) => {
          if (!value) {
            setIsLoading(false);
            return "취소 사유는 필수로 입력해야 합니다!";
          }
        },
      });

      if (cancelReason) {
        await updateDoc(orderRef, {
          cancel_reason: cancelReason,
          order_status: "취소요청",
        });
        setIsLoading(false);
        Swal.fire(alertList.successMessage("취소 요청이 완료되었습니다."));
      }
    } catch (error) {
      setIsLoading(false);
      console.error("취소 요청 실패:", error);
      Swal.fire(alertList.errorMessage("취소 요청에 실패했습니다."));
    }
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) {
      return "";
    }
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

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
                  <ItemDescription>주문번호 : {order.imp_uid}</ItemDescription>
                  <ItemDescription>
                    주문시각 : {formatDate(order.created_at)}
                  </ItemDescription>
                  <ItemTitle>{order.name}</ItemTitle>
                  <ItemDescription>
                    결제상태 :{" "}
                    {isAdmin ? (
                      <SelectArea
                        value={order.order_status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="주문완료">주문완료</option>
                        <option value="배송준비중">배송준비중</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                        <option value="취소요청">취소요청</option>
                        <option value="주문취소">주문취소</option>
                      </SelectArea>
                    ) : (
                      order.order_status
                    )}
                  </ItemDescription>
                  <ItemDescription>
                    결제금액 : {order.amount.toLocaleString()}원
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
                {isAdmin ? (
                  <CancelDeleteContent>
                    <DeleteButton onClick={() => handleDelete(order.id)}>
                      X
                    </DeleteButton>
                    {order.cancel_reason && (
                      <ItemDescription>
                        취소 요청 (사유) : {order.cancel_reason}
                      </ItemDescription>
                    )}
                    <CancelButton
                      onClick={() => handleCancelOrder(order.imp_uid, order.id)}
                    >
                      주문 취소
                    </CancelButton>
                  </CancelDeleteContent>
                ) : (
                  <CancelDeleteContent>
                    {order.cancel_reason && (
                      <ItemDescription>
                        취소 요청 (사유) :{order.cancel_reason}
                      </ItemDescription>
                    )}
                    <CancelButton
                      onClick={() => requestOrderCancellation(order.id)}
                    >
                      취소 요청
                    </CancelButton>
                  </CancelDeleteContent>
                )}
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
