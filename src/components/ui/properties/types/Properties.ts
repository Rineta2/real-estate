export interface PropertiesType {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail: string;
  type: string;
  status: string;
  statusProject: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
    uid: string;
  };
  details: {
    id: string;
    imageUrl: string;
    title: string;
  };
  facilities: {
    id: string;
    imageUrl: string;
    title: string;
  }[];
  images: string[];
  province: string;
  city: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyCardProps {
  item: PropertiesType;
  index: number;
}

export interface TopPropertyProps {
  property: PropertiesType;
}
