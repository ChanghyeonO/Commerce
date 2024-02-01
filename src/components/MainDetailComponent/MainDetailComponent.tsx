import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ImageSlider from "../ImageSlider/ImageSlider";
import { fetchItems } from "../DummyDataFetch";

import {
  Container,
  TopContent,
  LeftContent,
  RightContent,
  DescriptionArea,
  Title,
  Description,
  OptionArea,
  OptionButton,
  ProductCountArea,
  MinusButton,
  CountInput,
  PlusButton,
  TotalPriceArea,
  TotalPrice,
  CheckoutButtonArea,
  ShoppingBasketButton,
  PurchaseButton,
  BottomContent,
  ProductIntroArea,
  ProductImage,
  ProductDescription,
} from "./MainDetailComponentStyle";

interface Item {
  id: number;
  name: string;
  price: string;
  description: string;
  itemDescription: {
    imageUrl: string;
    description: string;
  }[];
}

const MainDetailComponent = () => {
  const [item, setItem] = useState<Item>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (typeof id === "string") {
        const response = await fetchItems();
        const item = response.items.find(item => item.id === parseInt(id));
        if (item) {
          setItem(item);
        }
      }
    };

    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    if (item) {
      setTotalPrice(parseInt(item.price) * itemCount);
    }
  }, [item, itemCount]);

  const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value);
    if (!isNaN(newCount) && newCount > 0) {
      setItemCount(newCount);
    }
  };

  return (
    <Container>
      <TopContent>
        <LeftContent>
          <ImageSlider />
        </LeftContent>
        <RightContent>
          <DescriptionArea>
            <Title>{item?.name}</Title>
            <Description>{item?.description}</Description>
          </DescriptionArea>
          <OptionArea>
            <OptionButton>옵션1</OptionButton>
            <OptionButton>옵션2</OptionButton>
            <OptionButton>옵션3</OptionButton>
            <OptionButton>옵션4</OptionButton>
            <OptionButton>옵션5</OptionButton>
            <OptionButton>옵션6</OptionButton>
          </OptionArea>
          <ProductCountArea>
            <MinusButton
              onClick={() => setItemCount(prev => Math.max(1, prev - 1))}
            >
              -
            </MinusButton>
            <CountInput
              type="number"
              value={itemCount}
              onChange={handleItemCountChange}
            />
            <PlusButton onClick={() => setItemCount(prev => prev + 1)}>
              +
            </PlusButton>
          </ProductCountArea>
          <TotalPriceArea>
            <TotalPrice>{totalPrice} 원</TotalPrice>
          </TotalPriceArea>
          <CheckoutButtonArea>
            <ShoppingBasketButton>장바구니</ShoppingBasketButton>
            <PurchaseButton>구매</PurchaseButton>
          </CheckoutButtonArea>
        </RightContent>
      </TopContent>
      <BottomContent>
        {item?.itemDescription.map((desc, index) => (
          <ProductIntroArea key={index}>
            <ProductImage src={desc.imageUrl} />
            <ProductDescription>{desc.description}</ProductDescription>
          </ProductIntroArea>
        ))}
      </BottomContent>
    </Container>
  );
};

export default MainDetailComponent;
