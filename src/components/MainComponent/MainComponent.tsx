import ImageSlider from "../ImageSlider/ImageSlider";
import {
  Container,
  TopContent,
  BottomContent,
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
  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <ItemContent>
          <IntroArea>
            <IntroTitle>펀딩 상품 목록</IntroTitle>
            <GoProductPageButton>더보기 {">"}</GoProductPageButton>
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
            <GoProductPageButton>더보기 {">"}</GoProductPageButton>
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
    </Container>
  );
};

export default MainComponent;
