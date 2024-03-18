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
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  itemsPerPage = 4,
) => {
  console.log(`Fetching items from ${collectionName}`);
  const itemsRef = collection(db, collectionName);
  let itemsQuery;
  if (lastFetchedItem) {
    itemsQuery = query(
      itemsRef,
      orderBy(sortBy, sortDirection),
      startAfter(lastFetchedItem),
      limit(itemsPerPage),
    );
  } else {
    itemsQuery = query(
      itemsRef,
      orderBy(sortBy, sortDirection),
      limit(itemsPerPage),
    );
  }
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
