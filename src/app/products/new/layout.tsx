import ProductsLayout from '@/common/layouts/ProductsLayout';

const NewProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProductsLayout showCreateButton={false}>{children}</ProductsLayout>;
};

export default NewProductLayout;
