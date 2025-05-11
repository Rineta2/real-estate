import { PropertiesType } from "@/components/ui/properties/types/Properties";

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

import { Role } from "@/types/Auth";

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  photoURL?: string;
  updatedAt: FirestoreTimestamp;
  isActive: boolean;
  phoneNumber: string;
  createdAt: FirestoreTimestamp;
}

export interface ContentGridProps {
  items: (BlogType | PropertiesType)[];
  type: "blog" | "properties";
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface ProfileHeaderProps {
  profile: UserAccount;
}

export interface ProfileStatsProps {
  profile: UserAccount;
}

export interface ProfileTabsProps {
  activeTab: "blog" | "properties";
  setActiveTab: (tab: "blog" | "properties") => void;
  blogCount: number;
  propertyCount: number;
}
