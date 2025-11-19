export interface ItemsModels {
  id: number;
  title: string;
  pictures: string[];
  description: string;
  available: boolean;
  instructions?: string;
  url?: string;
  price?: number;
  retail?: number;
  condition?: string;
  category?: string;
}
