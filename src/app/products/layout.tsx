import { Toaster } from 'sonner';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ProductsLayout;
