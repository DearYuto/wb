import { ProductType } from '@/domains/product/types/product';
import { productAPI } from '@/domains/product/infras/api/productAPI';

export const createProduct = async (input: ProductType) => {
  return await productAPI.createProduct(input);
};
