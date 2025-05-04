export interface facilities {
  imageUrl: string;
  title: string;
}

export interface details {
  title: string;
  imageUrl: string;
}

export interface locations {
  city: string;
  province: string;
}

export interface Properties {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
  facilities: facilities[];
  details: details[];
  type: string;
  status: "Draf" | "Publish";
  content: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL?: string;
  };
  statusProject: "Sedang Berjalan" | "Selesai" | "Coming Soon";
  locations: locations[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormInputs {
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
  facilities: facilities[];
  details: details[];
  type: string;
  status: "Draf" | "Publish";
  content: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL?: string;
  };
  statusProject: "Sedang Berjalan" | "Selesai" | "Coming Soon";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyTitle: string;
  isLoading: boolean;
}
