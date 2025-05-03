export interface BlogType {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
}

export interface SearchModalProps {
  searchQuery: string;
  searchResults: BlogType[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchResultClick: (article: BlogType) => void;
  handleModalClose: () => void;
}

export interface CategoryFilterProps {
  blog: BlogType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export interface BlogCardProps {
  blog: BlogType;
}

export interface TopBlogProps {
  blog: BlogType;
}
