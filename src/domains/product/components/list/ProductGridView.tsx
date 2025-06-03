interface ProductGridViewProps {
  children: React.ReactNode;
}

const ProductGridView = ({ children }: ProductGridViewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};

export default ProductGridView;
