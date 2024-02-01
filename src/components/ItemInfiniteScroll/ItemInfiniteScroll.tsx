import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  description: string;
  itemDescription: {
    imageUrl: string;
    description: string;
  }[];
}

const ItemInfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const loadItems = async (page: number) => {
    const response = await fetchItems(page);
    setItems(prevItems => {
      const newItems = response.items.filter(
        newItem => !prevItems.some(prevItem => prevItem.id === newItem.id),
      );
      return [...prevItems, ...newItems];
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
        <ItemBox
          key={item.id}
          style={{ marginBottom: "20px" }}
          onClick={() => handleItemClick(item.id)}
        >
          <ItemImage
            src={item.itemDescription[0].imageUrl}
            alt={`Product ${item.id}`}
          />
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
