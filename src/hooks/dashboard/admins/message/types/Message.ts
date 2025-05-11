export interface Message {
  id: string;
  propertyId: string;
  contactMethod: string;
  message: string;
  name: string;
  phone: string;
  status: string;
  timestamp: number;
}

export interface Property {
  id: string;
  slug: string;
  title?: string;
  hasMessages: boolean;
}

export interface CardProps {
  message: Message;
  propertyId: string;
  onReply: (message: Message) => void;
  onCall: (message: Message) => void;
}

export type ContactMethodFilter = "all" | "whatsapp" | "phone";

export type StatusFilter = "all" | "pending" | "replied";

export interface FilterProps {
  showFilters: boolean;
  toggleFilters: () => void;
  propertyId: string;
  contactMethodFilter: ContactMethodFilter;
  statusFilter: StatusFilter;
  properties: Property[];
  handlePropertyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleContactMethodChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface Message {
  id: string;
  propertyId: string;
  contactMethod: string;
  message: string;
  name: string;
  phone: string;
  status: string;
  timestamp: number;
}

export interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMessage: Message | null;
  handleMakeCall: () => void;
}

export interface WhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMessage: {
    id: string;
    propertyId: string;
    message: string;
    name: string;
    phone: string;
    timestamp: number;
  } | null;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSendWhatsApp: () => void;
}
