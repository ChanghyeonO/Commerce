import react, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import ImageUpload from "../ImageUpload/ImageUpload";

import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  AddImageButton,
  AddItemButton,
} from "../MainComponent/MainComponentStyle";

const ProductComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const auth = getAuth();
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

  let linkPath = "/other/create";

  if (location.pathname.includes("/funding")) {
    linkPath = "/funding/create";
  } else if (location.pathname.includes("/other")) {
    linkPath = "/other/create";
  }

  const handleShowImageUpload = () => {
    setShowImageUpload(!showImageUpload);
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
            <Link to={linkPath}>
              <AddItemButton>상품 등록</AddItemButton>
            </Link>
          </AddItemButtonArea>
        )}
        <ItemInfiniteScroll />
      </BottomContent>
      {showImageUpload && (
        <ImageUpload onClose={() => setShowImageUpload(false)} />
      )}
    </Container>
  );
};

export default ProductComponent;
