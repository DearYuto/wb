import { Toaster } from 'sonner';

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        unstyled: true,
        duration: 3000,
        classNames: {
          toast:
            'flex items-center rounded-xl bg-white border border-gray-200 shadow-md font-bold px-6 py-4 gap-4',
          title: 'text-base',
          description: 'text-sm',
          error: 'text-red-500 border-red-200 bg-red-50',
          success: 'text-blue-500 border-blue-200',
        },
      }}
    />
  );
};

export default Toast;
