import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../../api/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import {
  Container,
  InnerContent,
  Title,
  InfoTextContainer,
  InfoText,
  ShoppingBasketContainer,
  ShoppingBasket,
  ShippingAreaContainer,
  NameInput,
  PhoneNumberInput,
  MainAddressArea,
  AddressInput,
  FindAddressButton,
  AddressDetailInput,
  DeliveryRequestInput,
} from "./CheckoutComponentStyle";
import {
  CenterContent,
  EmptyInfomation,
  ItemArea,
  ItemDescription,
  ItemImage,
  ItemOption,
  ItemTitle,
  ProductCountArea,
  RightContent,
  TotalPrice,
  OrderButtonArea,
  OrderButton,
} from "../ShoppingBasketComponent/ShoppingBasketComponentStyle";

import Loading from "../Loading/Loading";
import { CartItem } from "../../types/ItemType";
import { PaymentDetails } from "../../types/PortOneType";

const CheckoutComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryReq, setDeliveryReq] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    addressDetail: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchCartData();
  }, []);

  async function fetchUserData() {
    if (!auth.currentUser) {
      console.log("로그인된 사용자가 없습니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("해당 문서가 없습니다.");
        return;
      }

      const userData = userDoc.data();
      setUser(current => ({
        ...current,
        ...userData,
        email: auth.currentUser!.email || "",
      }));
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  function fetchCartData() {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      const items = JSON.parse(cartData);
      setCartItems(items);
      const total = items.reduce(
        (sum: number, item: CartItem) => sum + item.totalPrice,
        0,
      );
      setTotalAmount(total);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser(current => ({ ...current, [name]: value }));
  }

  const getAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setUser(prevUser => ({
          ...prevUser,
          address: data.address,
          addressDetail: "",
        }));
      },
    }).open();
  };

  const processPayment = async () => {
    const { IMP } = window;
    const shoppingMallID = import.meta.env.VITE_SHOPPINGMALL_ID;
    IMP.init(shoppingMallID);

    let orderName = "주문명:결제테스트";
    if (cartItems.length > 0) {
      const additionalItemsCount = cartItems.length - 1;
      orderName =
        `${cartItems[0].name}` +
        (additionalItemsCount > 0 ? ` 외 ${additionalItemsCount}건` : "");
    }

    const paymentData = {
      pg: "tosspayments",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: orderName,
      amount: totalAmount,
      buyer_name: user.name,
      buyer_tel: user.phoneNumber,
      buyer_email: user.email,
      buyer_addr: `${user.address} ${user.addressDetail}`,
      buyer_postcode: "",
      m_redirect_url:
        "https://web-commerce-qrd2als3zw3jc.sel5.cloudtype.app/mypage/order-history",
    };

    IMP.request_pay(paymentData, async (response: PaymentDetails) => {
      setIsLoading(true);
      if (response.imp_uid) {
        try {
          const { data } = await axios.get(
            `https://us-central1-commerce-204d5.cloudfunctions.net/getPaymentInfo?imp_uid=${response.imp_uid}`,
          );
          console.log(data.response.imp_uid);
          if (data.response.status === "paid") {
            const orderItemRef = doc(collection(db, "orderItems"));
            await setDoc(orderItemRef, {
              user_id: auth.currentUser?.uid,
              imp_uid: response.imp_uid,
              name: paymentData.name,
              amount: paymentData.amount,
              buyer_name: paymentData.buyer_name,
              buyer_tel: paymentData.buyer_tel,
              buyer_email: paymentData.buyer_email,
              buyer_addr: paymentData.buyer_addr,
              order_status: "결제완료",
              delivery_request: deliveryReq,
            });
            Swal.fire(alertList.successMessage("결제가 완료되었습니다."));
            setIsLoading(false);
            sessionStorage.removeItem("cart");
            navigate("/mypage/order-history");
          } else if (data.response.status === "ready") {
            Swal.fire(alertList.infoMessage("결제가 중단되었습니다."));
            setIsLoading(false);
          } else if (data.response.status === "failed") {
            Swal.fire(alertList.errorMessage("결제에 실패했습니다."));
            setIsLoading(false);
          }
        } catch (error) {
          console.error("결제 검증 과정에서 오류 발생:", error);
          setIsLoading(false);
        }
      } else {
        Swal.fire(alertList.errorMessage("결제 정보가 없습니다."));
        setIsLoading(false);
      }
    });
  };
  return (
    <Container>
      <InnerContent>
        <Title>주문하기</Title>
        <ShoppingBasketContainer>
          <InfoTextContainer>
            <InfoText>상품목록</InfoText>
          </InfoTextContainer>
          <ShoppingBasket>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <ItemArea key={`${item.id}-${item.option}-${index}`}>
                  <ItemImage src={item.image} alt={`Product ${item.id}`} />
                  <CenterContent>
                    <ItemTitle>{item.name}</ItemTitle>
                    <ItemOption>{item.option}</ItemOption>
                    <ItemDescription>{item.description}</ItemDescription>
                  </CenterContent>
                  <RightContent>
                    <TotalPrice>{`${item.totalPrice.toLocaleString()}원`}</TotalPrice>
                    <ProductCountArea>
                      <ItemDescription>수량 : {item.count} 개</ItemDescription>
                    </ProductCountArea>
                  </RightContent>
                </ItemArea>
              ))
            ) : (
              <EmptyInfomation>장바구니가 비었습니다.</EmptyInfomation>
            )}
          </ShoppingBasket>
          <InfoTextContainer>
            <InfoText>최종 금액: {totalAmount.toLocaleString()}원</InfoText>
          </InfoTextContainer>
        </ShoppingBasketContainer>

        <ShippingAreaContainer>
          <InfoTextContainer>
            <InfoText>받는 사람 정보</InfoText>
          </InfoTextContainer>
          <NameInput
            type="text"
            placeholder="이름"
            value={user.name}
            onChange={handleChange}
          />
          <PhoneNumberInput
            name="phoneNumber"
            type="text"
            placeholder="전화번호"
            value={user.phoneNumber}
            onChange={handleChange}
          />
          <MainAddressArea>
            <AddressInput
              type="text"
              placeholder="주소"
              value={user.address}
              readOnly
            />
            <FindAddressButton onClick={getAddress}>검색</FindAddressButton>
          </MainAddressArea>
          <AddressDetailInput
            name="addressDetail"
            type="text"
            placeholder="상세 주소"
            value={user.addressDetail}
            onChange={handleChange}
          />
          <DeliveryRequestInput
            type="text"
            placeholder="배송 요청사항 ex) 배송 전 연락주세요."
            value={deliveryReq}
            onChange={e => setDeliveryReq(e.target.value)}
          />
        </ShippingAreaContainer>
        <OrderButtonArea>
          <OrderButton onClick={processPayment}>결제하기</OrderButton>
        </OrderButtonArea>
        {isLoading && <Loading />}
      </InnerContent>
    </Container>
  );
};

export default CheckoutComponent;
