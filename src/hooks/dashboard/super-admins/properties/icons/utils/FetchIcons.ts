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

import { PropertiesIconsItem } from "@/hooks/dashboard/super-admins/properties/icons/types/icons";

import toast from "react-hot-toast";

export const usePropertiesIcons = () => {
  const [iconsItems, setIconsItems] = useState<PropertiesIconsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: null as File | null,
  });
  const [editingItem, setEditingItem] = useState<PropertiesIconsItem | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPropertiesIcons();
  }, []);

  const fetchPropertiesIcons = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES_ICONS as string
        )
      );
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PropertiesIconsItem[];
      setIconsItems(items);
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
        fileName: `properties-icons-${Date.now()}-${file.name}`,
        folder: "/properties-icons",
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
      const timestamp = new Date().toISOString();

      if (editingItem) {
        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES_ICONS as string,
            editingItem.id
          ),
          {
            imageUrl,
            updatedAt: timestamp,
          }
        );
        toast.success("Icons berhasil diperbarui");
      } else {
        await addDoc(
          collection(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES_ICONS as string
          ),
          {
            imageUrl,
            createdAt: timestamp,
            updatedAt: timestamp,
          }
        );
        toast.success("Icons berhasil ditambahkan");
      }

      setFormData({ image: null });
      setSelectedImage(null);
      setEditingItem(null);
      setIsModalOpen(false);
      fetchPropertiesIcons();
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
          process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES_ICONS as string,
          itemToDelete
        )
      );
      toast.success("Icons berhasil dihapus");
      fetchPropertiesIcons();
    } catch (error) {
      console.error("Error deleting Icons item:", error);
      toast.error("Gagal menghapus Icons");
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleEdit = (item: PropertiesIconsItem) => {
    setEditingItem(item);
    setFormData({ image: null });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedItems = iconsItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(iconsItems.length / itemsPerPage);

  return {
    iconsItems,
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
    fetchPropertiesIcons,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    confirmDelete,
    handleEdit,
    handlePageChange,
  };
};
