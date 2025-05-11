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
    displayName: string;
    photoURL: string;
    role: string;
    uid: string;
    name: string;
  };
  details: {
    id: string;
    imageUrl: string;
    title: string;
  }[];
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

export interface RelatedPropertiesProps {
  relatedProperties: PropertiesType[];
  currentSlug: string;
}
