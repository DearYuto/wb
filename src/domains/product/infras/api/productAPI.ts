import { ProductType } from '@/domains/product/types/product';

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
};
