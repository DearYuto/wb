import Link from 'next/link';

const CreateButton = () => {
  return (
    <button className="rounded-md border border-blue-500 px-4 py-2 text-sm font-bold text-blue-500 transition-all duration-300 hover:border-blue-400 hover:text-blue-400">
      <Link href="/products/new">상품 생성</Link>
    </button>
  );
};

export default CreateButton;
