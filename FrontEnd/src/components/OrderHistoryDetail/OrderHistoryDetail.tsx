import React, { useEffect, useState } from "react";
import {
  CloseButton,
  CloseButtonArea,
  Container,
  InnerContent,
  InnerItem,
  ItemArea,
  ProductName,
  ProductPrice,
} from "./OrderHistoryDetailStyle";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";

interface ItemInfo {
  id: string;
  name: string;
  price: number;
}

interface OrderHistoryDetailProps {
  items: string[];
  onClose: () => void;
}

const OrderHistoryDetail = ({ items, onClose }: OrderHistoryDetailProps) => {
  const [itemInfos, setItemInfos] = useState<ItemInfo[]>([]);

  useEffect(() => {
    const fetchItemInfos = async () => {
      const fetchedItems: ItemInfo[] = [];

      for (const itemId of items) {
        const fundingItemDoc = await getDoc(doc(db, "fundingItems", itemId));
        if (fundingItemDoc.exists()) {
          fetchedItems.push({
            id: fundingItemDoc.id,
            name: fundingItemDoc.data().name,
            price: fundingItemDoc.data().price,
          });
          continue;
        }

        const otherItemDoc = await getDoc(doc(db, "otherItems", itemId));
        if (otherItemDoc.exists()) {
          fetchedItems.push({
            id: otherItemDoc.id,
            name: otherItemDoc.data().name,
            price: otherItemDoc.data().price,
          });
        }
      }

      setItemInfos(fetchedItems);
    };

    fetchItemInfos();
  }, [items]);

  return (
    <Container>
      <InnerContent>
        <ItemArea>
          {itemInfos.map((item, index) => (
            <InnerItem key={index}>
              <ProductName>
                {index + 1} . {item.name}
              </ProductName>
              <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
            </InnerItem>
          ))}
        </ItemArea>
        <CloseButtonArea>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </CloseButtonArea>
      </InnerContent>
    </Container>
  );
};

export default OrderHistoryDetail;
