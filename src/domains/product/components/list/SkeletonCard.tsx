const SkeletonCard = () => {
  return (
    <div className="animate-pulse border rounded-md p-4 shadow">
      <div className="w-full h-60 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/2" />
      <div className="h-3 bg-gray-200 rounded mt-2 w-1/3" />
    </div>
  );
};

export default SkeletonCard;
