import React, { ChangeEvent, useEffect, useState } from "react";
import { auth, db } from "../../api/firebase";
import { doc, getDoc } from "firebase/firestore";
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

import { CartItem } from "../../types/ItemType";

const CheckoutComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    addressDetail: "",
    password: "",
  });

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
        }));
      },
    }).open();
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
            type="text"
            placeholder="상세 주소"
            value={user.addressDetail}
            onChange={handleChange}
          />
          <DeliveryRequestInput
            type="text"
            placeholder="배송 요청사항 ex) 배송 전 연락주세요."
          />
        </ShippingAreaContainer>
        <OrderButtonArea>
          <OrderButton>결제하기</OrderButton>
        </OrderButtonArea>
      </InnerContent>
    </Container>
  );
};

export default CheckoutComponent;
