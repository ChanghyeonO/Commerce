import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../../api/firebase";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import DefaultButton from "../DefaultButton/DefaultButton";
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
} from "../ShoppingBasketComponent/ShoppingBasketComponentStyle";

import Loading from "../Loading/Loading";
import { CartItem, PostData } from "../../types/ItemType";
import { PaymentDetails } from "../../types/PortOneType";

const CheckoutComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryReq, setDeliveryReq] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { selectedCategory } = useCart();
  const [localUser, setLocalUser] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    addressDetail: user?.addressDetail || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, [user, selectedCategory]);

  function fetchCartData() {
    if (!selectedCategory) {
      Swal.fire(
        alertList.infoMessage(
          "선택된 제품 카테고리가 없습니다. 장바구니로 돌아가서 카테고리를 선택해주세요.",
        ),
      );
      navigate("/mypage/cart");
      return;
    }

    const sessionKey =
      selectedCategory === "funding" ? "fundingItemsCart" : "otherItemsCart";
    const storedData = sessionStorage.getItem(sessionKey);
    const items = storedData ? JSON.parse(storedData) : [];
    setCartItems(items);

    const total = items.reduce(
      (sum: number, item: CartItem) => sum + item.totalPrice,
      0,
    );
    setTotalAmount(total);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLocalUser((current) => ({ ...current, [name]: value }));
  }

  const getAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setLocalUser((prevUser) => ({
          ...prevUser,
          address: data.address,
          addressDetail: "",
        }));
      },
    }).open();
  };

  const updateStocksAfterPayment = async () => {
    const fundingItemsCart: CartItem[] = JSON.parse(
      sessionStorage.getItem("fundingItemsCart") || "[]",
    );
    const otherItemsCart: CartItem[] = JSON.parse(
      sessionStorage.getItem("otherItemsCart") || "[]",
    );

    await updateStockForItems(fundingItemsCart, "fundingItems");
    await updateStockForItems(otherItemsCart, "otherItems");

    sessionStorage.removeItem("fundingItemsCart");
    sessionStorage.removeItem("otherItemsCart");
  };

  const updateStockForItems = async (
    items: CartItem[],
    collectionName: string,
  ) => {
    for (const item of items) {
      const productRef = doc(db, collectionName, item.id);
      await updateSalesCount(productRef, item.count);

      if (collectionName === "fundingItems") {
        const expiredProductRef = doc(db, "expiredFundingItems", item.id);
        await updateSalesCount(expiredProductRef, item.count);
      }
    }
  };

  const updateSalesCount = async (
    documentRef: DocumentReference,
    itemCount: number,
  ) => {
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as PostData;
      const currentSales = data.salesCount || 0;
      const newSales = currentSales + itemCount;

      await updateDoc(documentRef, {
        salesCount: newSales,
      });
      console.log(`재고 및 판매량 업데이트 성공: ${data.name}`);
    } else {
      console.error(`제품 정보 없음: ${documentRef.id}`);
    }
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
      buyer_name: user?.name || "이름 없음",
      buyer_tel: user?.phoneNumber || "전화번호 없음",
      buyer_email: user?.email || "이메일 없음",
      buyer_addr: `${user?.address || "주소 없음"} ${
        user?.addressDetail || ""
      }`,
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
          if (data.response.status === "paid") {
            const orderItemRef = doc(collection(db, "orderItems"));
            await setDoc(orderItemRef, {
              user_id: user?.userId || "userId 없음",
              imp_uid: response.imp_uid,
              name: paymentData.name,
              amount: paymentData.amount,
              buyer_name: paymentData.buyer_name,
              buyer_tel: paymentData.buyer_tel,
              buyer_email: paymentData.buyer_email,
              buyer_addr: paymentData.buyer_addr,
              order_status: "결제완료",
              delivery_request: deliveryReq,
              items: cartItems.map((item) => item.id),
              created_at: serverTimestamp(),
            });

            await updateStocksAfterPayment();

            Swal.fire(alertList.successMessage("결제가 완료되었습니다."));
            setIsLoading(false);

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

  const shortenText = (text: string | undefined, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
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
                    <ItemTitle>{shortenText(item.name, 15)}</ItemTitle>
                    <ItemOption>{shortenText(item.option, 15)}</ItemOption>
                    <ItemDescription>
                      {shortenText(item.description, 10)}
                    </ItemDescription>
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
            value={localUser.name}
            name="name"
            onChange={handleChange}
          />
          <PhoneNumberInput
            name="phoneNumber"
            type="text"
            placeholder="전화번호"
            value={localUser.phoneNumber}
            onChange={handleChange}
          />
          <MainAddressArea>
            <AddressInput
              type="text"
              placeholder="주소"
              value={localUser.address}
              readOnly
            />
            <FindAddressButton onClick={getAddress}>검색</FindAddressButton>
          </MainAddressArea>
          <AddressDetailInput
            name="addressDetail"
            type="text"
            placeholder="상세 주소"
            value={localUser.addressDetail}
            onChange={handleChange}
          />
          <DeliveryRequestInput
            type="text"
            placeholder="배송 요청사항 ex) 배송 전 연락주세요."
            value={deliveryReq}
            onChange={(e) => setDeliveryReq(e.target.value)}
          />
        </ShippingAreaContainer>
        <OrderButtonArea>
          <DefaultButton name={"결제하기"} onClick={processPayment} />
        </OrderButtonArea>
        {isLoading && <Loading />}
      </InnerContent>
    </Container>
  );
};

export default CheckoutComponent;
