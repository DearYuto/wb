import { Validation } from '@/common/types/form/formValidation';

interface FormValidationRule {
  title: Validation;
  description?: Validation;
  price: Validation;
  discountPercentage: Validation;
  brand: Validation;
}

const formValidationRule: FormValidationRule = {
  title: {
    minLength: {
      value: 1,
      message: '상품명을 입력해주세요.',
    },
    maxLength: {
      value: 15,
      message: '상품명은 15자 이하로 입력해주세요.',
    },
  },
  description: {
    maxLength: {
      value: 5000,
      message: '상품 설명은 5,000자 이하로 입력해주세요.',
    },
  },
  price: {
    min: {
      value: 1000,
      message: '상품 가격은 1,000원 이상이어야 합니다.',
    },
    error: {
      message: '상품 가격을 입력해주세요.',
    },
  },
  discountPercentage: {
    max: {
      value: 100,
      message: '할인율은 100% 이하로 입력해주세요.',
    },
  },
  brand: {
    error: {
      message: '브랜드를 선택해주세요.',
    },
  },
};

export default formValidationRule;
