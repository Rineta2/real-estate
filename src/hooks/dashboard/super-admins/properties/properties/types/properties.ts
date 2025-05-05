export interface facilities {
  imageUrl: string;
  title: string;
}

export interface details {
  imageUrl: string;
  title: string;
}

export interface locations {
  city: string;
  province: string;
}

export interface Properties {
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
  facilities: facilities[];
  details: details[];
  type: string;
  status: string;
  content: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL: string;
  };
  statusProject: string;
  province: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormInputs {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
  facilities: facilities[];
  details: details[];
  type: string;
  status: string;
  content: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL: string;
  };
  statusProject: string;
  province: string;
  city: string;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyTitle: string;
  isLoading: boolean;
}
