export interface PropertiesTypeContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropertiesTypeFormData = Omit<
  PropertiesTypeContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: PropertiesTypeFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: PropertiesTypeFormData;
  setFormData: (data: PropertiesTypeFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
