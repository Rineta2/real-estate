import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { PropertiesType } from "@/components/ui/properties/types/Properties";

export function FetchPropertiesDetails(
  slug: string,
  callback: (properties: PropertiesType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string),
    where("slug", "==", slug)
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as PropertiesType[]
    );
  });
}

export function FetchRelatedBlog(
  slug: string,
  callback: (properties: PropertiesType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string),
    orderBy("createdAt", "desc"),
    limit(4)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const properties = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    }));
    callback(properties as PropertiesType[]);
  });

  return unsubscribe;
}
