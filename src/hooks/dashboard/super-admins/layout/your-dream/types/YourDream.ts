export interface images {
  images: string;
  file?: File;
}

export interface YourDreamContent {
  id?: string;
  title: string;
  description: string;
  imageUrl: images[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: YourDreamContent;
  setFormData: (data: YourDreamContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
