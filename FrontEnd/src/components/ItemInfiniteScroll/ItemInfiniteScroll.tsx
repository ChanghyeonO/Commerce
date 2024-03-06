import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useSort } from "../../contexts/SortContext";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "../../api/api";
import { db, storage } from "../../api/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import { Item } from "../../types/ItemType";

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
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const location = useLocation();
  const { sortOption } = useSort();
  const { user } = useUser();
  const isAdmin = user?.admin ?? false;

  const collectionName = location.pathname.includes("/funding")
    ? "fundingItems"
    : "otherItems";

  const fetchItemsWithCursor = async ({ pageParam = null }) => {
    let sortBy = "createdAt";
    let sortDirection: "desc" | "asc" = "desc";

    if (sortOption === "최신순") {
      sortBy = "createdAt";
      sortDirection = "desc";
    } else if (sortOption === "과거순") {
      sortBy = "createdAt";
      sortDirection = "asc";
    } else if (sortOption === "높은 가격순") {
      sortBy = "price";
      sortDirection = "desc";
    } else if (sortOption === "낮은 가격순") {
      sortBy = "price";
      sortDirection = "asc";
    }
    return fetchItems(collectionName, pageParam, sortBy, sortDirection, 4);
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["items", collectionName, sortOption],
      fetchItemsWithCursor,
      {
        getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleItemClick = (id: string) => {
    const basePath = location.pathname.includes("/funding")
      ? "/funding"
      : "/other";
    navigate(`${basePath}/detail/${id}`);
  };

  const deleteItemWithImage = async (
    itemId: string,
    itemDescriptions: { description: string; imageUrl: string }[],
  ) => {
    const result = await Swal.fire(
      alertList.doubleCheckMessage("정말로 삭제하시겠습니까?"),
    );

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, collectionName, itemId));

        const deletePromises = itemDescriptions.map(({ imageUrl }) => {
          const urlPath = new URL(imageUrl).pathname;
          const decodedPath = decodeURIComponent(urlPath)
            .split("/o/")[1]
            ?.split("?")[0];
          const storagePath = `images/${decodedPath}`;
          const imageRef = storageRef(storage, storagePath);
          return deleteObject(imageRef);
        });

        await Promise.all(deletePromises);
        Swal.fire(alertList.successMessage("삭제가 완료되었습니다."));
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(alertList.errorMessage("삭제에 실패했습니다."));
      }
    }
  };
  return (
    <Container>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.items.map((item: Item) => (
            <ItemBox key={item.id} onClick={() => handleItemClick(item.id)}>
              {isAdmin && (
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItemWithImage(item.id, item.itemDescription);
                  }}
                />
              )}
              <ItemImage
                src={
                  item.itemDescription[0]?.imageUrl ||
                  "https://bunny-pit-image.s3.ap-northeast-2.amazonaws.com/image.png"
                }
                alt={`Product ${item.id}`}
              />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price.toLocaleString()} 원</ItemPrice>
            </ItemBox>
          ))}
        </React.Fragment>
      ))}
      <EndMessage ref={ref}>
        {isFetchingNextPage ? "제품 정보를 불러오는 중입니다." : ""}
      </EndMessage>
    </Container>
  );
};

export default ItemInfiniteScroll;
