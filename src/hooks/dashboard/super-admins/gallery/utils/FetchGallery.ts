import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import imagekitInstance from "@/utils/imagekit/imagekit";

import { GalleryItem } from "@/hooks/dashboard/super-admins/gallery/types/Gallery";
import toast from "react-hot-toast";

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: null as File | null,
  });
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string)
      );
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryItem[];
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("Gagal memuat data gallery");
    } finally {
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
        fileName: `gallery-${Date.now()}-${file.name}`,
        folder: "/gallery",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengupload gambar");
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.image) return;

      const imageUrl = await handleImageUpload(formData.image);

      if (editingItem) {
        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string,
            editingItem.id
          ),
          {
            imageUrl,
          }
        );
        toast.success("Gambar berhasil diperbarui");
      } else {
        await addDoc(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string),
          {
            imageUrl,
          }
        );
        toast.success("Gambar berhasil ditambahkan");
      }

      setFormData({ image: null });
      setSelectedImage(null);
      setEditingItem(null);
      setIsModalOpen(false);
      fetchGalleryItems();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      toast.error("Gagal menyimpan gambar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsSubmitting(true);
      await deleteDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string,
          itemToDelete
        )
      );
      toast.success("Gambar berhasil dihapus");
      fetchGalleryItems();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast.error("Gagal menghapus gambar");
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({ image: null });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedItems = galleryItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

  return {
    galleryItems,
    isLoading,
    isModalOpen,
    isDeleteModalOpen,
    itemToDelete,
    formData,
    editingItem,
    selectedImage,
    isSubmitting,
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    setIsModalOpen,
    setIsDeleteModalOpen,
    setItemToDelete,
    setFormData,
    setEditingItem,
    setSelectedImage,
    setIsSubmitting,
    setCurrentPage,
    fetchGalleryItems,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    confirmDelete,
    handleEdit,
    handlePageChange,
  };
};
