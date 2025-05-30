import { ProductFormFieldType } from '@/domains/product/types/productFormField';
import { RegisterOptions } from 'react-hook-form';

export const toReactHookFormValidationRules = (field: ProductFormFieldType): RegisterOptions => {
  const { required, validation } = field;

  const rules: RegisterOptions = {
    required: required ? '필수 입력 항목입니다.' : false,
  };

  if (validation) {
    if (validation.minLength) {
      rules.minLength = {
        value: validation.minLength.value,
        message:
          validation.minLength.message ?? `${validation.minLength.value}자 이상 입력해주세요.`,
      };
    }

    if (validation.maxLength) {
      rules.maxLength = {
        value: validation.maxLength.value,
        message:
          validation.maxLength.message ?? `${validation.maxLength.value}자 이하로 입력해주세요.`,
      };
    }

    if (validation.min) {
      rules.min = {
        value: validation.min.value,
        message: validation.min.message ?? `${validation.min.value} 이상의 값을 입력해주세요.`,
      };
    }

    if (validation.max) {
      rules.max = {
        value: validation.max.value,
        message: validation.max.message ?? `${validation.max.value} 이하의 값을 입력해주세요.`,
      };
    }

    if (validation.pattern) {
      rules.pattern = {
        value: validation.pattern.value,
        message: validation.pattern.message ?? '올바른 형식이 아닙니다.',
      };
    }
  }

  return rules;
};
