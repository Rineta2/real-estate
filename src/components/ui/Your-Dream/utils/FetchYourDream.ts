import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { YourDreamType } from "@/components/ui/Your-Dream/types/YourDream";

export function FetchYourDream(callback: (yourDream: YourDreamType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_YOUR_DREAM as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString(),
      })) as YourDreamType[]
    );
  });
}
