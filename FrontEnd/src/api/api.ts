import { db } from "./firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
  DocumentData,
} from "firebase/firestore";
import { Item } from "../types/ItemType";

export const fetchItems = async (
  collectionName: string,
  lastFetchedItem: DocumentData | null = null,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  itemsPerPage: number = 4,
) => {
  console.log(`다음 컬렉션으로 부터 데이터 로드 ${collectionName}`);
  const itemsRef = collection(db, collectionName);

  let itemsQuery = query(
    itemsRef,
    orderBy(sortBy, sortDirection),
    limit(itemsPerPage),
  );
  if (lastFetchedItem) {
    itemsQuery = query(
      itemsRef,
      orderBy(sortBy, sortDirection),
      startAfter(lastFetchedItem),
      limit(itemsPerPage),
    );
  }

  try {
    const querySnapshot = await getDocs(itemsQuery);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Item[];

    return {
      items,
      lastVisible,
      hasMore: querySnapshot.docs.length === itemsPerPage,
    };
  } catch (error) {
    console.error("데이터를 로드에 실패했습니다.", collectionName, ":", error);
    throw error;
  }
};
