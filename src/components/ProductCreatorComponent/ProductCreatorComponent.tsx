import React from "react";

import {
  Container,
  Header,
  ProductNameInput,
  ProductDescriptionInput,
  OptionInputArea,
  OptionInput,
  OptionAddButton,
  PriceAddInput,
  Body,
  ContentAddButton,
  IntroContentArea,
  ImageArea,
  DescriptionImage,
  TextArea,
  DescriptionText,
} from "./ProductCreatorComponentStyle";

const ProductCreatorComponent = () => {
  return (
    <Container>
      <Header>
        <ProductNameInput />
        <ProductDescriptionInput />
        <OptionInputArea>
          <OptionInput />
          <OptionAddButton>추가</OptionAddButton>
          <PriceAddInput />
        </OptionInputArea>
      </Header>
      <Body>
        <ContentAddButton>추가</ContentAddButton>
        <IntroContentArea>
          <ImageArea>
            <DescriptionImage />
          </ImageArea>
          <TextArea>
            <DescriptionText />
          </TextArea>
        </IntroContentArea>
      </Body>
    </Container>
  );
};

export default ProductCreatorComponent;
