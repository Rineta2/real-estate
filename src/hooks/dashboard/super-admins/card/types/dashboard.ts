export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    tension: number;
  }[];
}

export interface Message {
  id: string;
  propertyId: string;
  timestamp: number;
  name: string;
  message: string;
  contactMethod: string;
  status: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  message: string;
  status: "unread" | "read";
  createdAt: number;
}

export interface FirebaseContactMessage {
  fullName: string;
  email: string;
  message: string;
  status: "unread" | "read";
  createdAt: number;
}

export interface UserStats {
  total: number;
  superAdmins: number;
  admins: number;
  regularUsers: number;
}
