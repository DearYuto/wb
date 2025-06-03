const SkeletonCard = () => {
  return (
    <article className="group relative flex h-full min-h-[358px] flex-col justify-between rounded-md border p-4 shadow-sm">
      <figure className="overflow-hidden rounded">
        <div className="h-40 w-full animate-pulse bg-gray-200" />
      </figure>

      <header className="mt-4">
        <div className="mb-1 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
      </header>

      <div className="mb-2 mt-2 h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

      <footer className="mt-auto flex items-center space-x-2 pt-2">
        <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-14 animate-pulse rounded bg-gray-100" />
      </footer>
    </article>
  );
};

export default SkeletonCard;
