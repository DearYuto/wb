interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant: 'cancel' | 'confirm' | 'link';
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  variant,
  disabled = false,
  fullWidth = true,
}: ButtonProps) => {
  const base = `${fullWidth ? 'w-full' : 'w-auto'} rounded-lg px-5 py-2 text-base font-bold backdrop-blur-sm transition`;
  const variants = {
    cancel: `${base} border border-gray-200 bg-white/80 text-gray-700`,
    confirm: `${base} bg-blue-500/90 text-white hover:bg-blue-400/90 active:bg-blue-400/90 disabled:opacity-50`,
    link: `${base} rounded-md border border-blue-500 px-4 py-2 text-sm font-bold text-blue-500 transition-all duration-300 hover:border-blue-400 hover:text-blue-400 text-blue-500 hover:text-blue-400`,
  };

  return (
    <button onClick={onClick} disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  );
};

export default Button;
