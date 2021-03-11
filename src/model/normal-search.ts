import { Category } from './category';

export interface NormalSearch {
  author: string;
  categories: Category[];
  description?: string;
  firstEdition: boolean;
  genre: string;
  hpbUsedPrice?: any;
  id: number;
  name: string;
  publicationDate?: string;
  rareFind: boolean;
  signed: boolean;
  slug: string;
  synopsis: string;
}
