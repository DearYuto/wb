import { ProductType } from '@/domains/product/types/product';

type ProductSelectableFields = keyof ProductType;

export interface ProductQueryParams {
  q?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  select?: ProductSelectableFields[];
}
