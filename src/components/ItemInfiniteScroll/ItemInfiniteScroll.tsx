import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "../../api/api";
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

const ItemInfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const loadMoreItems = async () => {
    if (!hasMore) return;

    const {
      items: newItems,
      lastVisible: newLastVisible,
      hasMore: newHasMore,
    } = await fetchItems(lastVisible);

    setItems(prevItems => [...prevItems, ...newItems]);
    setLastVisible(newLastVisible);
    setHasMore(newHasMore);
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreItems();
    }
  }, [inView, hasMore]);

  useEffect(() => {
    items.forEach(item => console.log(item.itemDescription));
  }, [items]);
  return (
    <Container>
      {items.map(item => (
        <ItemBox key={item.id} onClick={() => handleItemClick(item.id)}>
          <ItemImage
            src={
              item.itemDescription && item.itemDescription.length > 0
                ? item.itemDescription[0].imageUrl
                : "https://bunny-pit-image.s3.ap-northeast-2.amazonaws.com/image.png"
            }
            alt={`Product ${item.id}`}
          />
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price}원</ItemPrice>
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
