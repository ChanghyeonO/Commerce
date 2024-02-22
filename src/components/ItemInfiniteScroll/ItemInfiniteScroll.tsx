import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "../../api/api";
import { db, storage, auth } from "../../api/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import { Item } from "../../types/ItemType";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import {
  Container,
  ItemBox,
  ItemImage,
  ItemName,
  ItemPrice,
  EndMessage,
} from "./ItemInfiniteScrollStyle";
import { DeleteButton } from "../ImageUpload/ImageUploadStyle";

const ItemInfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const location = useLocation();

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

  const getCollectionName = () => {
    if (location.pathname.includes("/funding")) {
      return "fundingItems";
    } else if (location.pathname.includes("/other")) {
      return "otherItems";
    }
  };

  const handleItemClick = (id: string) => {
    const basePath = location.pathname.includes("/funding")
      ? "/funding"
      : "/other";
    navigate(`${basePath}/detail/${id}`);
  };

  const loadMoreItems = async () => {
    if (!hasMore) return;
    const collectionName = getCollectionName();
    if (!collectionName) {
      console.error("Collection name is undefined.");
      return;
    }
    const {
      items: newItems,
      lastVisible: newLastVisible,
      hasMore: newHasMore,
    } = await fetchItems(collectionName, lastVisible);

    setItems(prevItems => [...prevItems, ...newItems]);
    setLastVisible(newLastVisible);
    setHasMore(newHasMore);
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreItems();
    }
  }, [inView, hasMore, location.pathname]);

  const deleteItemWithImage = async (
    itemId: string,
    itemDescriptions: { description: string; imageUrl: string }[],
  ) => {
    const collectionName = getCollectionName();
    if (!collectionName) {
      console.error("컬렉션 이름을 찾을 수 없습니다.");
      return;
    }

    const result = await Swal.fire(
      alertList.doubleCheckMessage("정말로 삭제하시겠습니까?"),
    );

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, collectionName, itemId));

        const deletePromises = itemDescriptions.map(itemDescription => {
          const imageUrl = itemDescription.imageUrl;
          const urlPath = new URL(imageUrl).pathname;
          const decodedPath = decodeURIComponent(urlPath)
            .split("/o/")[1]
            ?.split("?")[0];
          if (!decodedPath) {
            console.error("경로 추출 실패:", imageUrl);
            return Promise.resolve();
          }
          const storagePath = `images/${decodedPath.replace(
            /^\/?images\//,
            "",
          )}`;
          const imageRef = storageRef(storage, storagePath);
          return deleteObject(imageRef);
        });

        await Promise.all(deletePromises);

        setItems(items.filter(item => item.id !== itemId));

        Swal.fire(alertList.successMessage("삭제가 완료되었습니다."));
      } catch (error) {
        console.error("아이템 및 이미지 삭제 중 오류 발생:", error);
        Swal.fire(alertList.errorMessage("삭제에 실패했습니다."));
      }
    }
  };

  return (
    <Container>
      {items.map(item => (
        <ItemBox key={item.id} onClick={() => handleItemClick(item.id)}>
          {isAdmin && (
            <DeleteButton
              onClick={e => {
                e.stopPropagation();
                deleteItemWithImage(item.id, item.itemDescription);
              }}
            />
          )}
          <ItemImage
            src={
              item.itemDescription && item.itemDescription.length > 0
                ? item.itemDescription[0].imageUrl
                : "https://bunny-pit-image.s3.ap-northeast-2.amazonaws.com/image.png"
            }
            alt={`Product ${item.id}`}
          />
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
        </ItemBox>
      ))}
      <EndMessage ref={ref}>
        {hasMore
          ? "제품 정보를 불러오는 중입니다."
          : "더이상 불러올 제품 정보가 없습니다."}
      </EndMessage>
    </Container>
  );
};

export default ItemInfiniteScroll;
