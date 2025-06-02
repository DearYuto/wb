import { NextResponse } from 'next/server';
import { getViewTypeFromCookie } from '@/domains/product/utils/viewTypeWithCookie';

export async function GET() {
  const viewType = await getViewTypeFromCookie();

  return NextResponse.json({ viewType });
}
