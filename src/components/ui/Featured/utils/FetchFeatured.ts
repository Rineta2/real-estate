import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { FeaturedType } from "@/components/ui/Featured/types/Featured";

export function FetchFeatured(callback: (featured: FeaturedType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString(),
      })) as FeaturedType[]
    );
  });
}
