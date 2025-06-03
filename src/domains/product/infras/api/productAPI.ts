import { ProductListResponseType, ProductType } from '@/domains/product/types/product';
import { ProductQueryParams } from '../models/ProductQueryParams';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

export const productAPI = {
  async createProduct(productData: ProductType): Promise<ProductType> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        throw new Error(errorBody.message ?? '상품 등록에 실패했습니다');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getProducts(queryParams: ProductQueryParams): Promise<ProductListResponseType> {
    const response = await fetch(
      `${API_BASE_URL}/products?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
    );

    if (!response.ok) {
      throw new Error('상품 목록 조회에 실패했습니다');
    }

    const data = await response.json();

    return data;
  },
};
