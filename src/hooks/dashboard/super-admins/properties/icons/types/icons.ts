export interface PropertiesIconsItem {
  id: string;
  imageUrl: string;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}

export interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: {
    image: File | null;
  };
  setFormData: React.Dispatch<React.SetStateAction<{ image: File | null }>>;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  editingItem: PropertiesIconsItem | null;
  isSubmitting: boolean;
}
