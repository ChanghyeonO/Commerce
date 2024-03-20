import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { fetchItems } from "../../api/api";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import ImageUpload from "../ImageUpload/ImageUpload";
import DefaultButton from "../DefaultButton/DefaultButton";
import {
  Container,
  TopContent,
  BottomContent,
  CenterButtonArea,
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
  SoldOutInfoText,
} from "../ItemInfiniteScroll/ItemInfiniteScrollStyle";
import { Item } from "../../types/ItemType";
import Loading from "../Loading/Loading";

const MainComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const { data: fundingItems, isLoading: isLoadingFundingItems } = useQuery(
    ["fundingItems"],
    () => fetchItems("fundingItems"),
    { staleTime: 5 * 60 * 1000 },
  );

  const { data: otherItems, isLoading: isLoadingOtherItems } = useQuery(
    ["otherItems"],
    () => fetchItems("otherItems"),
    { staleTime: 5 * 60 * 1000 },
  );

  const navigate = useNavigate();
  const { user } = useUser();
  const isAdmin = user?.admin ?? false;

  const checkIfFundingEnded = (item: Item) => {
    if (!item.deadLine) return false;
    const now = new Date();
    const deadlineDate = item.deadLine.toDate();
    return now > deadlineDate;
  };

  const handleShowImageUpload = () => setShowImageUpload(!showImageUpload);

  const handleItemClick = (
    isFunding: boolean,
    id: string,
    productCount: number,
  ) => {
    if (productCount < 1) {
      Swal.fire(alertList.infoMessage("품절된 상품입니다."));
      return;
    }
    const path = isFunding ? `/funding/detail/${id}` : `/other/detail/${id}`;
    navigate(path);
  };

  if (isLoadingFundingItems || isLoadingOtherItems) {
    return <Loading />;
  }

  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <CenterButtonArea>
          {isAdmin && (
            <DefaultButton
              name={"슬라이드 사진 수정"}
              style={{
                justifyContent: "end",
              }}
              buttonStyle={{ height: "50px", background: "#38b6ff" }}
              onClick={handleShowImageUpload}
            />
          )}
        </CenterButtonArea>

        <ItemContent>
          <IntroArea>
            <IntroTitle>펀딩 상품 목록</IntroTitle>
            <Link to="/funding">
              <GoProductPageButton>더보기 {">"}</GoProductPageButton>
            </Link>
          </IntroArea>
          <ItemArea>
            {fundingItems?.items.map((item) => (
              <ItemBox
                key={item.id}
                onClick={() =>
                  handleItemClick(true, item.id, item.productCount)
                }
              >
                {checkIfFundingEnded(item) && (
                  <SoldOutInfoText>펀딩 마감</SoldOutInfoText>
                )}
                {item.productCount < 1 && !checkIfFundingEnded(item) && (
                  <SoldOutInfoText>품절</SoldOutInfoText>
                )}
                <ItemImage src={item.itemDescription[0].imageUrl} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
              </ItemBox>
            ))}
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
            {otherItems?.items.map((item) => (
              <ItemBox
                key={item.id}
                onClick={() =>
                  handleItemClick(false, item.id, item.productCount)
                }
              >
                {item.productCount < 1 && (
                  <SoldOutInfoText>품절</SoldOutInfoText>
                )}
                <ItemImage src={item.itemDescription[0].imageUrl} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
              </ItemBox>
            ))}
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
