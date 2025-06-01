import { FormFieldType } from '@/common/types/form/formField';
import { ProductType } from './product';

export type ProductFormFieldType = FormFieldType & {
  name: keyof ProductType;
};
