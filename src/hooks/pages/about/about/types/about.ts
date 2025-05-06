import { Timestamp } from "firebase/firestore";

export interface TopAboutType {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ArtAboutType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  text: typeText[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface typeText {
  id: string;
  title: string;
  description: string;
}

export interface CardAboutType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AboutType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  text: typeText[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
