'use client';

import { UseFormHandleSubmit, Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';

import { ProductType } from '@/domains/product/types/product';
import { useFinalPrice } from '@/domains/product/hooks/useFinalPrice';
import formFields from '@/domains/product/form/fields/formFields';
import ProductFormFieldRenderer from '@/domains/product/components/new/ProductFormFieldRenderer';
import Button from '@/common/components/Button';

interface ProductFormProps {
  onValid: (data: ProductType) => void;
  isValid: boolean;
  register: UseFormRegister<ProductType>;
  errors: FieldErrors<ProductType>;
  control: Control<ProductType>;
  handleSubmit: UseFormHandleSubmit<ProductType>;
}

const ProductForm = ({
  onValid,
  isValid,
  register,
  errors,
  control,
  handleSubmit,
}: ProductFormProps) => {
  const finalPrice = useFinalPrice(control);

  return (
    <Form.Root
      onSubmit={handleSubmit(onValid)}
      className="mx-auto w-full max-w-md rounded-2xl transition-all duration-200"
    >
      {formFields.map((field) => (
        <Form.Field className="mb-4 flex flex-col gap-2" key={field.name} name={field.name}>
          <div className="flex items-center justify-between gap-2">
            <Form.Label
              htmlFor={field.name}
              className="flex items-center gap-1 text-base font-semibold text-gray-700"
            >
              {field.required && <span className="text-red-500">*</span>}
              <span className={field.required ? 'font-bold' : ''}>{field.label}</span>
            </Form.Label>
            {errors[field.name] && (
              <Form.Message className="text-xs text-red-500">
                {errors[field.name]?.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <ProductFormFieldRenderer field={field} register={register} />
          </Form.Control>
        </Form.Field>
      ))}

      <div className="my-4 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-3">
        <span className="font-bold text-blue-500">최종 가격</span>
        <span className="text-xl font-bold text-blue-500">{finalPrice.toLocaleString()}원</span>
      </div>

      <Button variant="confirm" disabled={!isValid} onClick={handleSubmit(onValid)}>
        등록하기
      </Button>
    </Form.Root>
  );
};

export default ProductForm;
