export interface aboutText {
  title: string;
  description: string;
}

export interface AboutContent {
  id?: string;
  title: string;
  description: string;
  text: aboutText[];
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: AboutContent;
  setFormData: (data: AboutContent) => void;
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
