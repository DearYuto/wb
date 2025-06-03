const ProductFormHeader = () => {
  return (
    <div className="relative mb-6 flex flex-col items-center justify-center">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
        <svg
          className="h-5 w-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">상품 등록</h2>
      <p className="mt-1 text-sm text-gray-500">새로운 상품 정보를 입력해 주세요.</p>
    </div>
  );
};

export default ProductFormHeader;
