import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import { Link } from "react-router-dom";
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
          <Link to="/other/-create">
            <AddItemButton>상품 등록</AddItemButton>
          </Link>
        </AddItemButtonArea>
        <ItemInfiniteScroll />
      </BottomContent>
    </Container>
  );
};

export default ProductComponent;
