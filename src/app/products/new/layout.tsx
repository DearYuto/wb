import ProductsLayout from '@/common/layouts/ProductsLayout';

const NewProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ProductsLayout showCreateButton={false}>{children}</ProductsLayout>
    </main>
  );
};

export default NewProductLayout;
