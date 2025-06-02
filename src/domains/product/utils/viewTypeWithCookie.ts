'use server';

import { cookies } from 'next/headers';
import { VIEW_TYPE_COOKIE_NAME, VIEW_TYPE_EXPIRE_SECONDS } from '../constants/productsView';
import { ViewType } from '../types/viewType';
import { getRandomViewType } from './getRandomViewType';

const generateViewTypeCookie = async () => {
  const viewType = getRandomViewType();

  const cookieStore = await cookies();
  cookieStore.set(VIEW_TYPE_COOKIE_NAME, viewType, {
    maxAge: VIEW_TYPE_EXPIRE_SECONDS,
    path: '/',
  });

  return viewType;
};

export const getViewTypeFromCookie = async (): Promise<ViewType> => {
  const cookieStore = await cookies();
  const viewType = cookieStore.get(VIEW_TYPE_COOKIE_NAME)?.value as ViewType | undefined;

  if (!viewType) {
    return await generateViewTypeCookie();
  }

  return viewType;
};
