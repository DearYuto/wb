import Modal from '@/common/components/Modal';
import { ProductType } from '../../types/product';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  formData: ProductType;
  finalPrice: number;
}

const CreateConfirmModal = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  formData,
  finalPrice,
}: CreateModalProps) => {
  const { title, price, discountPercentage, brand } = formData;

  return (
    <Modal
      showConfirmModal={open}
      setShowConfirmModal={onClose}
      title={'입력한 정보로 상품을 등록할까요?'}
    >
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white/70 p-6 backdrop-blur-md transition-all duration-200">
        <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50/70 px-6 py-5 backdrop-blur-sm">
          <ul className="divide-y divide-gray-200/70">
            <li className="flex justify-between py-2 text-base">
              <span className="font-medium text-gray-500">상품명</span>
              <span className="text-gray-900">{title}</span>
            </li>
            <li className="flex justify-between py-2 text-base">
              <span className="font-medium text-gray-500">가격</span>
              <span className="text-gray-900">{price.toLocaleString()}원</span>
            </li>
            <li className="flex justify-between py-2 text-base">
              <span className="font-medium text-gray-500">할인율</span>
              <span className="text-gray-900">{discountPercentage}%</span>
            </li>
            <li className="flex justify-between py-2 text-base">
              <span className="font-medium text-gray-500">브랜드</span>
              <span className="text-gray-900">{brand}</span>
            </li>

            <li className="flex items-center justify-between rounded-lg pt-4">
              <span className="font-bold text-blue-500">최종 가격</span>
              <span className="text-xl font-bold text-blue-500">
                {finalPrice.toLocaleString()}원
              </span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-200 bg-white/80 px-5 py-2 text-base font-bold text-gray-700 backdrop-blur-sm transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-500/90 px-5 py-2 text-base font-bold text-white backdrop-blur-sm transition hover:bg-blue-400/90 active:bg-blue-400/90 disabled:opacity-50"
          >
            {isLoading ? '생성 중...' : '확인'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateConfirmModal;
