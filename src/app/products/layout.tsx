import ProductsLayout from '@/common/layouts/ProductsLayout';

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProductsLayout showCreateButton={true}>{children}</ProductsLayout>;
};

export default ListLayout;
