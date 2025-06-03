import Link from 'next/link';

const Navigation = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="sticky top-0 z-10 flex h-[80px] items-center justify-between gap-4 bg-white/80 p-6 px-16 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/90">
      <h1 className="cursor-pointer text-xl font-bold text-blue-500 transition-all duration-300 hover:text-blue-400">
        <Link href="/products">YutoShop</Link>
      </h1>
      {children}
    </nav>
  );
};

export default Navigation;
