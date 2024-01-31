import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "../DummyDataFetch";

import {
  Container,
  ItemBox,
  ItemImage,
  ItemName,
  ItemPrice,
  EndMessage,
} from "./ItemInfiniteScrollStyle";

interface Item {
  id: number;
  name: string;
  price: string;
  imageUrl1: string;
}

const ItemInfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  const loadItems = async (page: number) => {
    const response = await fetchItems(page);
    setItems(prevItems => {
      response.items.forEach(item => console.log(item.id));
      return [...prevItems, ...response.items];
    });
    setHasMore(response.hasMore);
  };
  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    loadItems(page);
  }, [page]);

  return (
    <Container>
      {items.map(item => (
        <ItemBox key={item.id} style={{ marginBottom: "20px" }}>
          <ItemImage src={item.imageUrl1} alt={`Product ${item.id}`} />
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price}</ItemPrice>
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
