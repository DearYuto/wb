const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-md">
      <h2 className="pl-6 text-2xl font-bold text-blue-500">YutoShop</h2>
      {children}
    </nav>
  );
};

export default Navigation;
