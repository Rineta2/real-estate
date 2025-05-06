export interface CardContactText {
  title: string;
  description: string;
  href: string;
}

export interface CardContactContent {
  id?: string;
  title: string;
  description: string;
  card: CardContactText[];
  googleMapsIframe: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const initialFormData: CardContactContent = {
  title: "",
  description: "",
  card: [],
  googleMapsIframe: "",
};

export interface ContentModalProps {
  formData: CardContactContent;
  setFormData: (data: CardContactContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
