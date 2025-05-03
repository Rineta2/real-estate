import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

export function FetchBlogDetails(
  slug: string,
  callback: (blog: BlogType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string),
    where("slug", "==", slug)
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as BlogType[]
    );
  });
}

export function FetchRelatedBlog(
  slug: string,
  callback: (blog: BlogType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string),
    orderBy("createdAt", "desc"),
    limit(4)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const blog = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    }));
    callback(blog as BlogType[]);
  });

  return unsubscribe;
}
