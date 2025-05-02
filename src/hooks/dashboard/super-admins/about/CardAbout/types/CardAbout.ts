export interface CardAboutContent {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: CardAboutContent;
  setFormData: (data: CardAboutContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
