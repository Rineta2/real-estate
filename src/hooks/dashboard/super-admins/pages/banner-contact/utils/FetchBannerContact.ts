import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import imagekitInstance from "@/utils/imagekit/imagekit";

import { BannerContactContent } from "@/hooks/dashboard/super-admins/pages/banner-contact/types/BannerContact";

export const useBannerContactData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<BannerContactContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_BANNER_CONTACT as string
        )
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BannerContactContent[];
      setContents(contentArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setIsLoading(false);
    }
  };

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
        fileName: `banner-contact-${Date.now()}`,
        folder: "/banner-contacts",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const createContent = async (
    data: BannerContactContent,
    imageUrl: string
  ) => {
    await addDoc(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_BANNER_CONTACT as string
      ),
      {
        ...data,
        imageUrl,
        createdAt: new Date(),
      }
    );
  };

  const handleUpdate = async (
    id: string,
    updatedData: BannerContactContent
  ) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_BANNER_CONTACT as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date(),
      });
      await fetchContents();
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_BANNER_CONTACT as string,
        id
      );
      await deleteDoc(docRef);
      await fetchContents();
      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

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
