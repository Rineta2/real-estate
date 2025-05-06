export interface BannerContactContent {
  id?: string;
  title: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialFormData: BannerContactContent = {
  title: "",
  imageUrl: "",
};

export interface ContentModalProps {
  formData: BannerContactContent;
  setFormData: (data: BannerContactContent) => void;
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
