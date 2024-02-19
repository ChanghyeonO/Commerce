import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  AddImageButton,
  AddItemButton,
} from "../MainComponent/MainComponentStyle";

const ProductComponent = () => {
  const location = useLocation();
  let linkPath = "/other-create";

  if (location.pathname.includes("/funding")) {
    linkPath = "/funding-create";
  } else if (location.pathname.includes("/other")) {
    linkPath = "/other-create";
  }

  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <AddItemButtonArea>
          <AddImageButton>슬라이드 사진 수정</AddImageButton>
          <Link to={linkPath}>
            <AddItemButton>상품 등록</AddItemButton>
          </Link>
        </AddItemButtonArea>
        <ItemInfiniteScroll />
      </BottomContent>
    </Container>
  );
};

export default ProductComponent;
