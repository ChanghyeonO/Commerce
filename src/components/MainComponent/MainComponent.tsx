import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import { Container, TopContent, BottomContent } from "./MainComponentStyle";

const MainComponent = () => {
  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <ItemInfiniteScroll />
      </BottomContent>
    </Container>
  );
};

export default MainComponent;
