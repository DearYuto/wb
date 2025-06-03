import { Toaster } from 'sonner';
import Navigation from './Navigation';
import CreateButton from '@/domains/product/components/new/CreateButton';

interface ProductsLayoutProps {
  children: React.ReactNode;
  showCreateButton?: boolean;
}

const ProductsLayout = ({ children, showCreateButton = true }: ProductsLayoutProps) => {
  return (
    <main className="absolute left-0 top-0 w-full">
      <Toaster />
      <Navigation>{showCreateButton && <CreateButton />}</Navigation>
      <div className="px-16 pt-6">{children}</div>
    </main>
  );
};

export default ProductsLayout;
