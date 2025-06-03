const Spinner = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-gray-200" />
        <div className="absolute left-0 top-0 h-full w-full animate-spin-slow rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    </div>
  );
};

export default Spinner;
