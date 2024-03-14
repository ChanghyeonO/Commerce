import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getFirestore,
} from "firebase/firestore";
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

const MainComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [fundingItems, setFundingItems] = useState<Item[]>([]);
  const [otherItems, setOtherItems] = useState<Item[]>([]);

  const navigate = useNavigate();
  const db = getFirestore();
  const { user } = useUser();

  const isAdmin = user?.admin ?? false;

  const checkIfFundingEnded = (item: Item) => {
    if (!item.deadLine) return false;
    const now = new Date();
    const deadlineDate = item.deadLine.toDate();
    return now > deadlineDate;
  };

  useEffect(() => {
    const fetchItems = async () => {
      const fundingQuery = query(
        collection(db, "fundingItems"),
        orderBy("createdAt", "desc"),
        limit(4),
      );
      const otherQuery = query(
        collection(db, "otherItems"),
        orderBy("createdAt", "desc"),
        limit(4),
      );

      const fundingSnapshot = await getDocs(fundingQuery);
      const otherSnapshot = await getDocs(otherQuery);

      const fundingData = fundingSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Item[];
      const otherData = otherSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Item[];

      setFundingItems(fundingData);
      setOtherItems(otherData);
    };

    fetchItems();
  }, []);

  const handleShowImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

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
            {fundingItems.map((item) => (
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
            {otherItems.map((item) => (
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
