interface ProductListProps {
  viewType: 'list' | 'grid';
}

const ProductList = ({ viewType }: ProductListProps) => {
  console.log({ viewType });

  return <div>ProductList</div>;
};

export default ProductList;
