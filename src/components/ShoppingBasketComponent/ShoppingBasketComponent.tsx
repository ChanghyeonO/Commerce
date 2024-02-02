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
} from "./ShoppingBasketComponentStyle";

const ShoppingBasketComponent = () => {
  return (
    <Container>
      <TopContent>
        <Title>장바구니</Title>
      </TopContent>
      <BottomContent>
        <ItemArea>
          <ItemImage />
          <CenterContent>
            <ItemTitle>제품1</ItemTitle>
            <ItemDescription>제품설명설명</ItemDescription>
          </CenterContent>
          <RightContent>
            <TotalPrice>10000원</TotalPrice>
            <ProductCountArea>
              <MinusButton>-</MinusButton>
              <CountInput type="number" />
              <PlusButton>+</PlusButton>
            </ProductCountArea>
          </RightContent>
        </ItemArea>
      </BottomContent>
    </Container>
  );
};

export default ShoppingBasketComponent;
