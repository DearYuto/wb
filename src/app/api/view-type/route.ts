import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  VIEW_TYPE_COOKIE_NAME,
  VIEW_TYPE_EXPIRE_SECONDS,
} from '@/domains/product/constants/productsView';
import { ViewType } from '@/domains/product/types/viewType';

export async function GET() {
  const cookieStore = await cookies();

  const viewType = cookieStore.get(VIEW_TYPE_COOKIE_NAME)?.value as ViewType | undefined;

  return NextResponse.json({ viewType });
}

export async function POST(request: Request) {
  const { viewType } = await request.json();
  const cookieStore = await cookies();

  cookieStore.set(VIEW_TYPE_COOKIE_NAME, viewType, {
    maxAge: VIEW_TYPE_EXPIRE_SECONDS,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
