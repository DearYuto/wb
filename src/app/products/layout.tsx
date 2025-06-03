import Navigation from '@/common/layouts/Navigation';
import Link from 'next/link';
import { Toaster } from 'sonner';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="absolute left-0 top-0 w-full">
      <Toaster />
      <Navigation>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          <Link href="/products/new">상품 생성</Link>
        </button>
      </Navigation>

      <div className="p-6">{children}</div>
    </main>
  );
};

export default ProductsLayout;
