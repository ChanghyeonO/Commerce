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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const updateCartItems = (items: CartItem[]) => {
    setCartItems(items);
    sessionStorage.setItem("cart", JSON.stringify(items));
  };

  const handleDelete = (id: string, option: string) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item.id === id && item.option === option),
    );
    updateCartItems(updatedCartItems);
  };

  const handleIncrease = (id: string, option: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.option === option) {
        return {
          ...item,
          count: item.count + 1,
          totalPrice: (item.count + 1) * item.price,
        };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const handleDecrease = (id: string, option: string) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.option === option && item.count > 1) {
        return {
          ...item,
          count: item.count - 1,
          totalPrice: (item.count - 1) * item.price,
        };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  return (
    <Container>
      <MyPageNav />
      <RightContentArea>
        <Title>장바구니</Title>
        <BottomContent>
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
                  <DeleteButton
                    onClick={() => handleDelete(item.id, item.option)}
                  >
                    X
                  </DeleteButton>
                  <TotalPrice>{`${item.totalPrice}원`}</TotalPrice>
                  <ProductCountArea>
                    <MinusButton
                      onClick={() => handleDecrease(item.id, item.option)}
                    >
                      -
                    </MinusButton>
                    <CountInput type="number" value={item.count} readOnly />
                    <PlusButton
                      onClick={() => handleIncrease(item.id, item.option)}
                    >
                      +
                    </PlusButton>
                  </ProductCountArea>
                </RightContent>
              </ItemArea>
            ))
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
