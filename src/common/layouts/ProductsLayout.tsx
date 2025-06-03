import Navigation from './Navigation';
import CreateButton from '@/domains/product/components/new/CreateButton';

interface ProductsLayoutProps {
  children: React.ReactNode;
  showCreateButton?: boolean;
}

const ProductsLayout = ({ children, showCreateButton = true }: ProductsLayoutProps) => {
  return (
    <>
      <Navigation>{showCreateButton && <CreateButton />}</Navigation>
      <div className="px-16 pt-6">{children}</div>
    </>
  );
};

export default ProductsLayout;
