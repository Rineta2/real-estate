export interface YourDreamType {
  id: string;
  title: string;
  description: string;
  imageUrl: ImageType[];
  createdAt: string;
  updatedAt: string;
}

export interface ImageType {
  id: string;
  images: string;
}
