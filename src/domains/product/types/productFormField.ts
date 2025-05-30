import { Validation } from '@/common/types/validation/Validation';
import { ProductType } from './product';

export interface ProductFormFieldType {
  name: keyof ProductType;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  placeholder: string;
  required: boolean;

  validation?: Validation;

  children?: React.ReactNode;

  options?: {
    value: string;
    label: string;
    selected: boolean;
  }[];

  error?: {
    message: string;
  };
}
