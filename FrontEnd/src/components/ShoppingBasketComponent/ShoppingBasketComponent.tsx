import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyPageNav from "../MyPageNav/MyPageNav";

import {
  Container,
  RightContentArea,
  Title,
  BottomContent,
  ItemArea,
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
  OrderButton,
} from "./ShoppingBasketComponentStyle";

import { CartItem } from "../../types/ItemType";

const ShoppingBasketComponent = () => {
  const [fundingItems, setFundingItems] = useState<CartItem[]>([]);
  const [otherItems, setOtherItems] = useState<CartItem[]>([]);

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
        <ItemImage src={item.image} alt={`Product ${item.id}`} />
        <CenterContent>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemOption>{item.option}</ItemOption>
          <ItemDescription>{item.description}</ItemDescription>
        </CenterContent>
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

  return (
    <Container>
      <MyPageNav />
      <RightContentArea>
        <Title>장바구니</Title>
        <BottomContent>
          {fundingItems.length + otherItems.length > 0 ? (
            <>
              {renderItems(fundingItems, "funding")}
              {renderItems(otherItems, "other")}
            </>
          ) : (
            <EmptyInfomation>장바구니가 비었습니다.</EmptyInfomation>
          )}
        </BottomContent>
        <OrderButtonArea>
          <Link to={"/checkout"}>
            <OrderButton>주문하기</OrderButton>
          </Link>
        </OrderButtonArea>
      </RightContentArea>
    </Container>
  );
};

export default ShoppingBasketComponent;
