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
  lastFetchedItem: DocumentData | null,
  itemsPerPage = 4,
) => {
  const itemsRef = collection(db, "items");
  const itemsQuery = lastFetchedItem
    ? query(
        itemsRef,
        orderBy("name"),
        startAfter(lastFetchedItem),
        limit(itemsPerPage),
      )
    : query(itemsRef, orderBy("name"), limit(itemsPerPage));

  try {
    const querySnapshot = await getDocs(itemsQuery);
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const items = querySnapshot.docs.map(doc => {
      const itemData = doc.data() as Item;

      return {
        ...itemData,
        id: doc.id,
      };
    });

    console.log("Fetched items:", items);
    return {
      items,
      lastVisible,
      hasMore: querySnapshot.docs.length === itemsPerPage,
    };
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
