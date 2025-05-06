import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import {
  BannerContactType,
  CardContactType,
} from "@/hooks/pages/contact/types/contact";

export function FetchBannerContact(
  callback: (contact: BannerContactType[]) => void
) {
  const q = query(
    collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_BANNER_CONTACT as string
    ),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString(),
      })) as BannerContactType[]
    );
  });
}

export function FetchCardContact(
  callback: (contact: CardContactType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CARD_CONTACT as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString(),
      })) as CardContactType[]
    );
  });
}
