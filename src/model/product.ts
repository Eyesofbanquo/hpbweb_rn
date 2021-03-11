import { Category } from './category';

export interface Product {
  author: string;
  categories: Category[];
  description: string;
  firstEdition: boolean;
  genre: string;
  hpbUsedPrice: number;
  id: number;
  name: string;
  publicationDate: Date;
  rareFind: boolean;
  signed: boolean;
  slug: string;
  subtitle: string;
  synopsis?: string;
}
