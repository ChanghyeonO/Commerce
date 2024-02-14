import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  AddItemButton,
} from "./MainComponentStyle";

const MainComponent = () => {
  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        {/* <AddItemButtonArea>
          <AddItemButton>상품 등록</AddItemButton>
        </AddItemButtonArea> */}
        <ItemInfiniteScroll />
      </BottomContent>
    </Container>
  );
};

export default MainComponent;
