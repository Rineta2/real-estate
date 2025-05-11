import { Properties } from "@/hooks/dashboard/super-admins/properties/properties/types/properties";

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

export interface ActivityChartProps {
  chartData: ChartData;
  isLoading: boolean;
}

export interface PropertyListProps {
  properties: Properties[];
  filteredProperties: Properties[];
  propertyId: string;
  setPropertyId: (id: string) => void;
  isLoading: boolean;
}

export interface RecentContactsProps {
  contacts: ContactMessage[];
}

export interface RecentMessagesProps {
  messages: Message[];
}

export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface DashboardCardsProps {
  userStats: {
    total: number;
    superAdmins: number;
    admins: number;
    regularUsers: number;
  };
}
