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

import imagekitInstance from "@/utils/imagekit/imagekit";

import { AboutContent } from "@/hooks/dashboard/super-admins/about/about/types/About";

// Cache untuk menyimpan hasil fetch
let contentCache: AboutContent[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

export const useAboutData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<AboutContent[]>([]);
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
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT as string),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AboutContent[];

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

  const handleImageUpload = async (file: File) => {
    try {
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64 = await base64Promise;
      const result = await imagekitInstance.upload({
        file: base64,
        fileName: `about-content-${Date.now()}`,
        folder: "/about-contents",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const createContent = async (data: AboutContent, imageUrl: string) => {
    try {
      const docRef = await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT as string),
        {
          ...data,
          imageUrl,
          createdAt: new Date(),
        }
      );

      // Update local state instead of refetching
      const newContent = {
        ...data,
        id: docRef.id,
        imageUrl,
        createdAt: new Date(),
      };
      setContents((prev) => [newContent, ...prev]);
      contentCache = [newContent, ...(contentCache || [])];
    } catch (error) {
      console.error("Error creating content:", error);
      throw error;
    }
  };

  const handleUpdate = async (id: string, updatedData: AboutContent) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT as string,
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
        process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT as string,
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
    handleImageUpload,
    createContent,
    handleUpdate,
    handleDelete,
    fetchContents,
  };
};
