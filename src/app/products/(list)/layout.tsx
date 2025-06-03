import ProductsLayout from '@/common/layouts/ProductsLayout';

const ListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="absolute left-0 top-0 w-full">
      <ProductsLayout showCreateButton={true}>{children}</ProductsLayout>
    </main>
  );
};

export default ListLayout;
