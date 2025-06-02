import { PRODUCT_API_ENDPOINTS } from '@/constants/api/endpoint';
import { ViewType } from '../types/viewType';

export const fetchViewType = async (): Promise<ViewType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${PRODUCT_API_ENDPOINTS.VIEW_TYPE}`, {
    cache: 'no-store',
  });

  const data = await res.json();

  return data.viewType;
};
