import React, { useState, useEffect } from "react";
import {
  Container,
  TopContent,
  Title,
  BottomContent,
  ItemArea,
  ItemImage,
  CenterContent,
  ItemTitle,
  ItemDescription,
  RightContent,
  TotalPrice,
  ProductCountArea,
  MinusButton,
  CountInput,
  PlusButton,
  DeleteButton,
  EmptyInfomation,
} from "./ShoppingBasketComponentStyle";

interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  count: number;
  price: number;
  totalPrice: number;
}

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

  const handleDelete = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    updateCartItems(updatedCartItems);
  };

  const handleIncrease = (id: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        const newCount = item.count + 1;
        return { ...item, count: newCount, totalPrice: item.price * newCount };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const handleDecrease = (id: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.count > 1) {
        const newCount = item.count - 1;
        return { ...item, count: newCount, totalPrice: item.price * newCount };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  return (
    <Container>
      <TopContent>
        <Title>장바구니</Title>
      </TopContent>
      <BottomContent>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <ItemArea key={item.id}>
              <ItemImage src={item.image} alt={`Product ${item.id}`} />
              <CenterContent>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </CenterContent>
              <RightContent>
                <DeleteButton onClick={() => handleDelete(item.id)}>
                  X
                </DeleteButton>
                <TotalPrice>{`${item.totalPrice}원`}</TotalPrice>
                <ProductCountArea>
                  <MinusButton onClick={() => handleDecrease(item.id)}>
                    -
                  </MinusButton>
                  <CountInput type="number" value={item.count} readOnly />
                  <PlusButton onClick={() => handleIncrease(item.id)}>
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
    </Container>
  );
};

export default ShoppingBasketComponent;
