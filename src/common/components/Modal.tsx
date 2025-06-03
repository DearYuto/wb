import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (showConfirmModal: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ showConfirmModal, setShowConfirmModal, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={showConfirmModal} onOpenChange={setShowConfirmModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-md">
          <Dialog.Title className="mt-6 text-center text-xl font-bold tracking-tight text-gray-600">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
