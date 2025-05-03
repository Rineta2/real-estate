export interface BlogCategoryContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BlogCategoryFormData = Omit<
  BlogCategoryContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: BlogCategoryFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: BlogCategoryFormData;
  setFormData: (data: BlogCategoryFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
