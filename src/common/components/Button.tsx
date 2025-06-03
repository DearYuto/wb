interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant: 'cancel' | 'confirm';
}

const Button = ({ children, onClick, disabled = false, variant }: ButtonProps) => {
  const base = 'w-full rounded-lg px-5 py-2 text-base font-bold backdrop-blur-sm transition';
  const variants = {
    cancel: `${base} border border-gray-200 bg-white/80 text-gray-700`,
    confirm: `${base} bg-blue-500/90 text-white hover:bg-blue-400/90 active:bg-blue-400/90 disabled:opacity-50`,
  };

  return (
    <button onClick={onClick} disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  );
};

export default Button;
