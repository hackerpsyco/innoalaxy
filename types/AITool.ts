export interface AITool {
  id: number;
  name: string;
  description: string;
  category: string;
  features: string[];
  link: string;
  logo: string;
  rating: number;
  tags: string[];
  isFeatured: boolean;
  dateAdded: string;
}