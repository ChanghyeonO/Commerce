import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyPageNav from "../MyPageNav/MyPageNav";
import DefaultButton from "../DefaultButton/DefaultButton";
import { CartItem } from "../../types/ItemType";
import { useCart } from "../../contexts/CartContext";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

import {
  Container,
  RightContentArea,
  Title,
  BottomContent,
  ItemSelectInfoArea,
  SelectInputBox,
  InfoText,
  FundingItemSection,
  OtherItemSection,
  ItemArea,
  LeftContent,
  ItemImage,
  CenterContent,
  ItemTitle,
  ItemOption,
  ItemDescription,
  RightContent,
  TotalPrice,
  ProductCountArea,
  MinusButton,
  CountInput,
  PlusButton,
  DeleteButton,
  EmptyInfomation,
  OrderButtonArea,
} from "./ShoppingBasketComponentStyle";

const ShoppingBasketComponent = () => {
  const [fundingItems, setFundingItems] = useState<CartItem[]>([]);
  const [otherItems, setOtherItems] = useState<CartItem[]>([]);
  const { selectedCategory, setSelectedCategory } = useCart();
  const navigate = useNavigate();

  const handleCheckboxChange = (category: "funding" | "other") => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fundingData = sessionStorage.getItem("fundingItemsCart");
    const otherData = sessionStorage.getItem("otherItemsCart");
    if (fundingData) setFundingItems(JSON.parse(fundingData));
    if (otherData) setOtherItems(JSON.parse(otherData));
  }, []);

  const updateCartItems = (
    items: CartItem[],
    category: "funding" | "other",
  ) => {
    if (category === "funding") {
      setFundingItems(items);
      sessionStorage.setItem("fundingItemsCart", JSON.stringify(items));
    } else {
      setOtherItems(items);
      sessionStorage.setItem("otherItemsCart", JSON.stringify(items));
    }
  };

  const handleDelete = (
    id: string,
    option: string,
    category: "funding" | "other",
  ) => {
    const currentItems = category === "funding" ? fundingItems : otherItems;
    const updatedCartItems = currentItems.filter(
      (item) => !(item.id === id && item.option === option),
    );
    updateCartItems(updatedCartItems, category);
    window.dispatchEvent(new Event("sessionStorageChanged"));
  };

  const handleIncrease = (
    id: string,
    option: string,
    category: "funding" | "other",
  ) => {
    const currentItems = category === "funding" ? fundingItems : otherItems;
    const updatedCartItems = currentItems.map((item) => {
      if (item.id === id && item.option === option) {
        return {
          ...item,
          count: item.count + 1,
          totalPrice: (item.count + 1) * item.price,
        };
      }
      return item;
    });
    updateCartItems(updatedCartItems, category);
  };

  const handleDecrease = (
    id: string,
    option: string,
    category: "funding" | "other",
  ) => {
    const currentItems = category === "funding" ? fundingItems : otherItems;
    const updatedCartItems = currentItems.map((item) => {
      if (item.id === id && item.option === option && item.count > 1) {
        return {
          ...item,
          count: item.count - 1,
          totalPrice: (item.count - 1) * item.price,
        };
      }
      return item;
    });
    updateCartItems(updatedCartItems, category);
  };

  const renderItems = (items: CartItem[], category: "funding" | "other") => {
    return items.map((item, index) => (
      <ItemArea key={`${item.id}-${item.option}-${index}`}>
        <LeftContent>
          <ItemImage src={item.image} alt={`Product ${item.id}`} />
          <CenterContent>
            <ItemTitle>
              {item.name.length > 15
                ? `${item.name.substring(0, 15)}...`
                : item.name}
            </ItemTitle>
            <ItemOption>
              {item.option && item.option.length > 20
                ? `${item.option.substring(0, 20)}...`
                : item.option}
            </ItemOption>
            <ItemDescription>
              {item.description && item.description.length > 15
                ? `${item.description.substring(0, 20)}...`
                : item.description || ""}
            </ItemDescription>
          </CenterContent>
        </LeftContent>
        <RightContent>
          <DeleteButton
            onClick={() => handleDelete(item.id, item.option, category)}
          >
            X
          </DeleteButton>
          <TotalPrice>{`${item.totalPrice}원`}</TotalPrice>
          <ProductCountArea>
            <MinusButton
              onClick={() => handleDecrease(item.id, item.option, category)}
            >
              -
            </MinusButton>
            <CountInput type="number" value={item.count} readOnly />
            <PlusButton
              onClick={() => handleIncrease(item.id, item.option, category)}
            >
              +
            </PlusButton>
          </ProductCountArea>
        </RightContent>
      </ItemArea>
    ));
  };

  const handleOrderButtonClick = () => {
    if (!selectedCategory) {
      Swal.fire(alertList.infoMessage("제품 카테고리를 선택해주세요."));
    } else {
      navigate("/checkout");
    }
  };
  return (
    <Container>
      <MyPageNav />
      <RightContentArea>
        <Title>장바구니</Title>
        <BottomContent>
          {fundingItems.length + otherItems.length > 0 ? (
            <>
              <ItemSelectInfoArea>
                <SelectInputBox
                  type="checkbox"
                  checked={selectedCategory === "funding"}
                  onChange={() => handleCheckboxChange("funding")}
                />
                <InfoText>펀딩 제품</InfoText>
              </ItemSelectInfoArea>
              <FundingItemSection>
                {fundingItems.length > 0 && (
                  <>{renderItems(fundingItems, "funding")}</>
                )}
              </FundingItemSection>
              <ItemSelectInfoArea>
                <SelectInputBox
                  type="checkbox"
                  checked={selectedCategory === "other"}
                  onChange={() => handleCheckboxChange("other")}
                />
                <InfoText>기타 제품</InfoText>
              </ItemSelectInfoArea>
              <OtherItemSection>
                {otherItems.length > 0 && (
                  <>{renderItems(otherItems, "other")}</>
                )}
              </OtherItemSection>
            </>
          ) : (
            <EmptyInfomation>장바구니가 비었습니다.</EmptyInfomation>
          )}
        </BottomContent>
        <OrderButtonArea>
          <DefaultButton name="주문하기" onClick={handleOrderButtonClick} />
        </OrderButtonArea>
      </RightContentArea>
    </Container>
  );
};

export default ShoppingBasketComponent;
