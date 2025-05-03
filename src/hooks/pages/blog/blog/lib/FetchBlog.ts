import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

export function FetchBlog(callback: (blog: BlogType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string),
    where("status", "==", "published")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
      })) as BlogType[]
    );
  });
}
