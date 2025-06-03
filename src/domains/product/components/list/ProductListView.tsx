interface ProductListViewProps {
  children: React.ReactNode;
}

const ProductListView = ({ children }: ProductListViewProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default ProductListView;
