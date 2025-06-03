interface ProductGridViewProps {
  children: React.ReactNode;
}

const ProductGridView = ({ children }: ProductGridViewProps) => {
  return (
    <div className="grid min-w-[1024px] grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};

export default ProductGridView;
