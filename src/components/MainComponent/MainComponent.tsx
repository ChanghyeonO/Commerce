import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import { auth } from "../../api/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
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
import { Item } from "../../types/ItemType";

const MainComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fundingItems, setFundingItems] = useState<Item[]>([]);
  const [otherItems, setOtherItems] = useState<Item[]>([]);

  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setIsAdmin(docSnap.data().admin);
        }
      }
    };

    checkAdminStatus();
  }, []);

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

      const fundingData = fundingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Item[];
      const otherData = otherSnapshot.docs.map(doc => ({
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

  const handleItemClick = (isFunding: boolean, id: string) => {
    const path = isFunding ? `/funding/detail/${id}` : `/other/detail/${id}`;
    navigate(path);
  };

  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        {isAdmin && (
          <AddItemButtonArea>
            <AddImageButton onClick={handleShowImageUpload}>
              슬라이드 사진 수정
            </AddImageButton>
          </AddItemButtonArea>
        )}
        <ItemContent>
          <IntroArea>
            <IntroTitle>펀딩 상품 목록</IntroTitle>
            <Link to="/funding">
              <GoProductPageButton>더보기 {">"}</GoProductPageButton>
            </Link>
          </IntroArea>
          <ItemArea>
            {fundingItems.map(item => (
              <ItemBox
                key={item.id}
                onClick={() => handleItemClick(true, item.id)}
              >
                <ItemImage src={item.itemDescription[0].imageUrl} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price} 원</ItemPrice>
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
            {otherItems.map(item => (
              <ItemBox
                key={item.id}
                onClick={() => handleItemClick(false, item.id)}
              >
                <ItemImage src={item.itemDescription[0].imageUrl} />
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price} 원</ItemPrice>
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
