export interface cityText {
  city: string;
}

export interface PropertiesLocationsContent {
  id?: string;
  province: string;
  city: cityText[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type PropertiesLocationsFormData = Omit<
  PropertiesLocationsContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: PropertiesLocationsFormData = {
  province: "",
  city: [],
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: PropertiesLocationsFormData;
  setFormData: (data: PropertiesLocationsFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
}
