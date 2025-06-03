interface ProductGridViewProps {
  children: React.ReactNode;
}

const ProductGridView = ({ children }: ProductGridViewProps) => {
  return <div className="grid min-w-[1024px] grid-cols-4 gap-6">{children}</div>;
};

export default ProductGridView;
