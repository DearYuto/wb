import { BrandType } from '@/domains/brand/types/brand';

export interface ProductType {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: BrandType;
}
