export interface Message {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  userId: string;
  timestamp: number;
  status: "pending" | "read" | "replied";
  photoURL?: string;
  propertyId?: string;
}
