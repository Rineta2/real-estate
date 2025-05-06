import { useState, useEffect, useCallback } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import { CardContactContent } from "@/hooks/dashboard/super-admins/pages/card-contact/types/CardContact";

// Cache untuk menyimpan hasil fetch
let contentCache: CardContactContent[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

export const useCardContactData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<CardContactContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = useCallback(async (force = false) => {
    const now = Date.now();

    // Gunakan cache jika masih valid dan tidak dipaksa refresh
    if (
      !force &&
      contentCache &&
      lastFetchTime &&
      now - lastFetchTime < CACHE_DURATION
    ) {
      setContents(contentCache);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const q = query(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CARD_CONTACT as string
        ),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CardContactContent[];

      // Update cache
      contentCache = contentArray;
      lastFetchTime = now;

      setContents(contentArray);
    } catch (error) {
      console.error("Error fetching contents:", error);
      toast.error("Failed to fetch contents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createContent = async (data: CardContactContent) => {
    try {
      const docRef = await addDoc(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CARD_CONTACT as string
        ),
        {
          ...data,
          createdAt: new Date(),
        }
      );

      // Update local state instead of refetching
      const newContent = {
        ...data,
        id: docRef.id,
        createdAt: new Date(),
      };
      setContents((prev) => [newContent, ...prev]);
      contentCache = [newContent, ...(contentCache || [])];
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  };

  const handleUpdate = async (id: string, updatedData: CardContactContent) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_CARD_CONTACT as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date(),
      });

      // Update local state instead of refetching
      setContents((prev) =>
        prev.map((content) =>
          content.id === id
            ? { ...content, ...updatedData, updatedAt: new Date() }
            : content
        )
      );
      contentCache = contents.map((content) =>
        content.id === id
          ? { ...content, ...updatedData, updatedAt: new Date() }
          : content
      );
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_CARD_CONTACT as string,
        id
      );
      await deleteDoc(docRef);

      // Update local state instead of refetching
      setContents((prev) => prev.filter((content) => content.id !== id));
      contentCache = contents.filter((content) => content.id !== id);

      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return {
    isLoading,
    contents,
    isSubmitting,
    setIsSubmitting,
    createContent,
    handleUpdate,
    handleDelete,
    fetchContents,
  };
};
