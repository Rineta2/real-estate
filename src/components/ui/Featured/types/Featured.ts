export interface FeaturedType {
  id: string;
  title: string;
  text: string;
  imageUrl: ImageType[];
  description: DescriptionType[];
  count: CountType[];
  createdAt: string;
  updatedAt: string;
}

export interface ImageType {
  id: string;
  images: string;
}

export interface CountType {
  id: string;
  title: string;
  number: number;
}

export interface DescriptionType {
  id: string;
  title: string;
  description: string;
}
