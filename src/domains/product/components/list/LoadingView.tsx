import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';
import SkeletonCard from './SkeletonCard';

const LoadingView = ({ viewType, cardCount = 8 }: { viewType: ViewType; cardCount?: number }) => {
  const ViewLayout = viewType === 'grid' ? ProductGridView : ProductListView;

  return (
    <ViewLayout>
      {Array.from({ length: cardCount }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </ViewLayout>
  );
};

export default LoadingView;
