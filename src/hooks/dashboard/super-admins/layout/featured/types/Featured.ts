export interface images {
  images: string;
  file?: File;
}

export interface countText {
  title: string;
  number: number;
}

export interface descriptionText {
  title: string;
  description: string;
}

export interface FeaturedContent {
  id?: string;
  title: string;
  text: string;
  description: descriptionText[];
  count: countText[];
  imageUrl: images[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: FeaturedContent;
  setFormData: (data: FeaturedContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
