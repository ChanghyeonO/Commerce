import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";
import { auth, db } from "../../api/firebase";

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

  const fetchOrderList = async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    if (!user) {
      console.log("로그인된 사용자가 없습니다.");
      setIsLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists() && docSnap.data().admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    const ordersRef = collection(db, "orderItems");
    const queryToExecute = isAdmin
      ? query(ordersRef)
      : query(ordersRef, where("user_id", "==", user.uid));
    const querySnapshot = await getDocs(queryToExecute);

    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<OrderDetail, "id">),
    }));

    setOrderDetails(orders);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const orderRef = doc(db, "orderItems", orderId);

    try {
      await updateDoc(orderRef, {
        order_status: newStatus,
      });
      Swal.fire(alertList.successMessage("결제 상태 변경이 완료되었습니다."));
      fetchOrderList();
    } catch (error) {
      Swal.fire(alertList.errorMessage("결제 상태 변경에 실패했습니다."));
    }
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire(
      alertList.doubleCheckMessage("정말로 주문을 삭제하시겠습니까?"),
    );
    if (result.isConfirmed) {
      const orderRef = doc(db, "orderItems", orderId);

      try {
        await deleteDoc(orderRef);
        Swal.fire(
          alertList.successMessage("주문이 성공적으로 삭제되었습니다."),
        );
        fetchOrderList();
      } catch (error) {
        console.error("Error deleting order: ", error);
        Swal.fire(alertList.errorMessage("주문 삭제에 실패했습니다."));
      }
    }
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
                  <ItemTitle>{order.name}</ItemTitle>
                  <ItemDescription>
                    결제상태 :{" "}
                    {isAdmin ? (
                      <SelectArea
                        value={order.order_status}
                        onChange={e =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="주문완료">주문완료</option>
                        <option value="배송준비중">배송준비중</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                      </SelectArea>
                    ) : (
                      order.order_status
                    )}
                  </ItemDescription>
                  <ItemDescription>
                    결제금액 : {order.amount} 원
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
                <CancelDeleteContent>
                  <DeleteButton onClick={() => handleDelete(order.id)}>
                    X
                  </DeleteButton>
                  <ItemDescription>
                    취소 요청 : (사유) 필요 없어짐
                  </ItemDescription>
                  <CancelButton>주문 취소</CancelButton>
                </CancelDeleteContent>
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
