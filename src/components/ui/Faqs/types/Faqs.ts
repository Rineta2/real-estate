export interface FaqsType {
  id: string;
  title: string;
  description: string;
  faqs: faqsType[];
  createdAt: string;
  updatedAt: string;
}

export interface faqsType {
  id: string;
  title: string;
  description: string;
}
