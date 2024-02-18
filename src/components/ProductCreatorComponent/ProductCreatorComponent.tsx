import React from "react";

import {
  Container,
  InnerContent,
  Title,
  IntroText,
  Header,
  ProductNameInput,
  ProductDescriptionTextArea,
  OptionInputArea,
  OptionInput,
  OptionAddButton,
  PriceAddInput,
  Body,
  ContentAddButton,
  IntroContentArea,
  ImageArea,
  DescriptionImage,
  DescriptionText,
  UploadButtonArea,
  UploadButton,
} from "./ProductCreatorComponentStyle";

const ProductCreatorComponent = () => {
  return (
    <Container>
      <InnerContent>
        <Header>
          <Title>제품 정보 작성하기</Title>
          <ProductNameInput type="text" placeholder="제품명을 입력해주세요." />
          <ProductDescriptionTextArea placeholder="제품에 대해 간단하게 소개해주세요" />
          <OptionInputArea>
            <IntroText>추가할 옵션을 작성해주세요</IntroText>
            <OptionInput
              type="text"
              placeholder="추가할 옵션에 대해 작성해주세요"
            />
            <OptionAddButton>추가</OptionAddButton>
            <PriceAddInput
              type="number"
              placeholder="판매 금액을 작성해주세요"
            />
          </OptionInputArea>
        </Header>
        <Body>
          <IntroText>제품에 대한 추가 정보를 작성해주세요</IntroText>
          <IntroContentArea>
            <ImageArea>
              <DescriptionImage />
            </ImageArea>
            <DescriptionText placeholder="제품에 대해 상세하게 설명해주세요" />
          </IntroContentArea>
          <ContentAddButton>추가</ContentAddButton>
        </Body>
        <UploadButtonArea>
          <UploadButton>제품 추가하기</UploadButton>
        </UploadButtonArea>
      </InnerContent>
    </Container>
  );
};

export default ProductCreatorComponent;
