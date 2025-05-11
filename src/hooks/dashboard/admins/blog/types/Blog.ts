import { Timestamp } from "firebase/firestore";

export interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
  description: string;
  status: "draft" | "published";
}

export interface Category {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export interface ViewModalProps {
  blog: Blog | null;
  onClose: () => void;
}

export interface SearchAndFilterProps {
  filters: BlogFilters;
  categories: Category[];
  onFilterChange: (filters: BlogFilters) => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface BlogCardProps {
  blog: Blog;
  onView: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  canEdit: boolean;
}

export interface BlogModalProps {
  blog?: Blog | null;
  onClose: () => void;
  onSuccess?: () => void;
}
