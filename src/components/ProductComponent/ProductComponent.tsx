import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  AddImageButton,
  AddItemButton,
} from "../MainComponent/MainComponentStyle";

const ProductComponent = () => {
  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <AddItemButtonArea>
          <AddImageButton>슬라이드 사진 수정</AddImageButton>
          <AddItemButton>상품 등록</AddItemButton>
        </AddItemButtonArea>
        <ItemInfiniteScroll />
      </BottomContent>
    </Container>
  );
};

export default ProductComponent;
