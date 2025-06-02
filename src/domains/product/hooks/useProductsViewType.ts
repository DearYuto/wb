'use client';

import { useEffect, useState } from 'react';
import { ViewType } from '../types/viewType';
import { PRODUCT_API_ENDPOINTS } from '@/constants/api/endpoint';
import { getRandomViewType } from '../utils/getRandomViewType';

export const useViewType = () => {
  const [viewType, setViewType] = useState<ViewType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViewType = async () => {
      try {
        const res = await fetch(PRODUCT_API_ENDPOINTS.VIEW_TYPE);
        const data = await res.json();
        setViewType(data.viewType);
      } catch {
        const fallbackViewType = getRandomViewType();
        setViewType(fallbackViewType);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViewType();
  }, []);

  return { viewType, isLoading };
};
