import { BrandType } from '@/domains/brand/types/brand';

export interface ProductType {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: BrandType;
}

export interface ProductListResponseType {
  products: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    rating: number;
    reviews: Array<{
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }>;
  }[];
  total: number;
  skip: number;
  limit: number;
}
