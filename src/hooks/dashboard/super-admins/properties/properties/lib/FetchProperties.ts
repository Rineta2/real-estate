import { useState, useCallback, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "@/utils/firebase/firebase";
import { Properties, FormInputs } from "../types/properties";

export const usePropertiesData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Real-time listener implementation
  const fetchProperties = useCallback(
    async (page = 0) => {
      try {
        setIsLoading(true);

        const propertiesRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string
        );

        // Get total count first
        const totalSnapshot = await getDocs(propertiesRef);
        const totalCount = totalSnapshot.size;
        setTotalItems(totalCount);

        // Set up real-time listener with pagination
        const q = query(
          propertiesRef,
          orderBy("createdAt", "desc"),
          limit(itemsPerPage),
          limit(itemsPerPage * (page + 1))
        );

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const propertiesArray = snapshot.docs
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Properties[];

            setProperties(propertiesArray);
            setCurrentPage(page);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error in real-time listener:", error);
            toast.error("Gagal mengambil data properti");
            setIsLoading(false);
          }
        );

        // Cleanup listener when component unmounts or page changes
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up real-time listener:", error);
        toast.error("Gagal mengambil data properti");
        setIsLoading(false);
      }
    },
    [itemsPerPage]
  );

  const createProperty = async (formData: FormInputs) => {
    try {
      setIsSubmitting(true);

      await addDoc(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string
        ),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      return true;
    } catch (error) {
      console.error("Error creating property:", error);
      toast.error("Gagal membuat properti");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProperty = async (id: string, formData: FormInputs) => {
    try {
      setIsSubmitting(true);

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Gagal memperbarui properti");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      setIsDeleting(true);
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string,
        id
      );
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Gagal menghapus properti");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  // Set up initial real-time listener when component mounts
  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, fetchProperties]);

  return {
    isLoading,
    properties,
    isSubmitting,
    isDeleting,
    createProperty,
    updateProperty,
    deleteProperty,
    fetchProperties,
    currentPage,
    totalItems,
    itemsPerPage,
  };
};
