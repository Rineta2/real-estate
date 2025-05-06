import { Timestamp } from "firebase/firestore";

export interface BannerContactType {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CardContactType {
  id: string;
  title: string;
  description: string;
  googleMapsIframe: string;
  imageUrl: string;
  card: CardText[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CardText {
  id: string;
  title: string;
  description: string;
  href: string;
}
