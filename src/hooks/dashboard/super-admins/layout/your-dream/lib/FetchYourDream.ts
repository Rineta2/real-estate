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

import {
  YourDreamContent,
  images,
} from "@/hooks/dashboard/super-admins/layout/your-dream/types/YourDream";

// Cache untuk menyimpan hasil fetch
let contentCache: YourDreamContent[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

export const useYourDreamData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<YourDreamContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = useCallback(async (force = false) => {
    const now = Date.now();

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
          process.env.NEXT_PUBLIC_COLLECTIONS_YOUR_DREAM as string
        ),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as YourDreamContent[];

      contentCache = contentArray;
      lastFetchTime = now;

      setContents(contentArray);
    } catch {
      toast.error("Failed to fetch contents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Upload a single image to ImageKit
   * @param file The file to upload
   * @returns Promise with the uploaded image URL
   */
  const uploadImageToImageKit = async (file: File): Promise<string> => {
    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size should be less than 5MB");
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file");
      }

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const result = await imagekitInstance.upload({
        file: base64,
        fileName: `your-dream-${Date.now()}`,
        folder: "/your-dream-contents",
      });

      return result.url;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Process all images in the form data, uploading any that are blob URLs
   * @param imageUrls Array of image objects
   * @returns Promise with array of processed image objects
   */
  const processImages = async (imageUrls: images[]): Promise<images[]> => {
    const processedImages: images[] = [];

    for (const img of imageUrls) {
      try {
        if (img.images.startsWith("https://ik.imagekit.io")) {
          processedImages.push(img);
          continue;
        }

        if (img.file) {
          const uploadedUrl = await uploadImageToImageKit(img.file);
          processedImages.push({ images: uploadedUrl });
          continue;
        }

        if (img.images.startsWith("blob:")) {
          try {
            const response = await fetch(img.images);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch image: ${response.status} ${response.statusText}`
              );
            }
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            const uploadedUrl = await uploadImageToImageKit(file);
            processedImages.push({ images: uploadedUrl });
          } catch {
            continue;
          }
        }
      } catch {
        continue;
      }
    }

    return processedImages;
  };

  const createContent = async (data: YourDreamContent, imageUrl: images[]) => {
    try {
      const processedImages = await processImages(imageUrl);

      if (processedImages.length === 0) {
        throw new Error("No valid images to save");
      }

      const docRef = await addDoc(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_YOUR_DREAM as string
        ),
        {
          ...data,
          imageUrl: processedImages,
          createdAt: new Date(),
        }
      );

      const newContent = {
        ...data,
        id: docRef.id,
        imageUrl: processedImages,
        createdAt: new Date(),
      };
      setContents((prev) => [newContent, ...prev]);
      contentCache = [newContent, ...(contentCache || [])];
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (id: string, updatedData: YourDreamContent) => {
    try {
      const processedImages = await processImages(updatedData.imageUrl);

      if (processedImages.length === 0) {
        throw new Error("No valid images to save");
      }

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_YOUR_DREAM as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedData,
        imageUrl: processedImages,
        updatedAt: new Date(),
      });

      setContents((prev) =>
        prev.map((content) =>
          content.id === id
            ? {
                ...content,
                ...updatedData,
                imageUrl: processedImages,
                updatedAt: new Date(),
              }
            : content
        )
      );
      contentCache = contents.map((content) =>
        content.id === id
          ? {
              ...content,
              ...updatedData,
              imageUrl: processedImages,
              updatedAt: new Date(),
            }
          : content
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_YOUR_DREAM as string,
        id
      );
      await deleteDoc(docRef);

      setContents((prev) => prev.filter((content) => content.id !== id));
      contentCache = contents.filter((content) => content.id !== id);

      toast.success("Content deleted successfully!");
    } catch (error) {
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
    uploadImageToImageKit,
    createContent,
    handleUpdate,
    handleDelete,
    fetchContents,
  };
};
