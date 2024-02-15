import React, { useState } from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import ImageUpload from "../ImageUpload/ImageUpload";
import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  AddImageButton,
  ItemContent,
  IntroArea,
  IntroTitle,
  ItemArea,
  GoProductPageButton,
} from "./MainComponentStyle";
import {
  ItemBox,
  ItemImage,
  ItemName,
  ItemPrice,
} from "../ItemInfiniteScroll/ItemInfiniteScrollStyle";

const MainComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleShowImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <AddItemButtonArea>
          <AddImageButton onClick={handleShowImageUpload}>
            슬라이드 사진 수정
          </AddImageButton>
        </AddItemButtonArea>
        <ItemContent>
          <IntroArea>
            <IntroTitle>펀딩 상품 목록</IntroTitle>
            <Link to="/funding">
              <GoProductPageButton>더보기 {">"}</GoProductPageButton>
            </Link>
          </IntroArea>
          <ItemArea>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
          </ItemArea>
        </ItemContent>
        <ItemContent>
          <IntroArea>
            <IntroTitle>기타 상품 목록</IntroTitle>
            <Link to="/other">
              <GoProductPageButton>더보기 {">"}</GoProductPageButton>
            </Link>
          </IntroArea>
          <ItemArea>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
            <ItemBox>
              <ItemImage />
              <ItemName>더미</ItemName>
              <ItemPrice>15000 원</ItemPrice>
            </ItemBox>
          </ItemArea>
        </ItemContent>
      </BottomContent>
      {showImageUpload && (
        <ImageUpload onClose={() => setShowImageUpload(false)} />
      )}
    </Container>
  );
};

export default MainComponent;
