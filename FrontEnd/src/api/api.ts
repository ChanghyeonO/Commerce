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
  lastFetchedItem: DocumentData | null,
  itemsPerPage = 4,
) => {
  const itemsRef = collection(db, collectionName);
  const itemsQuery = lastFetchedItem
    ? query(
        itemsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastFetchedItem),
        limit(itemsPerPage),
      )
    : query(itemsRef, orderBy("createdAt", "desc"), limit(itemsPerPage));

  try {
    const querySnapshot = await getDocs(itemsQuery);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const items = querySnapshot.docs.map((doc) => {
      const itemData = doc.data() as Item;

      return {
        ...itemData,
        id: doc.id,
      };
    });

    return {
      items,
      lastVisible,
      hasMore: querySnapshot.docs.length === itemsPerPage,
    };
  } catch (error) {
    console.error("Error fetching items from", collectionName, ":", error);
    throw error;
  }
};
