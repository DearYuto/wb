'use client';

import { useState } from 'react';
import { useForm, UseFormRegister, useWatch } from 'react-hook-form';
import { toast, Toaster } from 'sonner';

import { ProductType } from '@/domains/product/types/product';
import * as Form from '@radix-ui/react-form';
import * as Dialog from '@radix-ui/react-dialog';
import { createProduct } from '@/domains/product/services/createProductService';
import { zodResolver } from '@hookform/resolvers/zod';
import productFormSchema from '@/domains/product/form/validations/schemas/productFormSchema';
import formFields from '@/domains/product/form/fields/formFields';
import { ProductFormFieldType } from '@/domains/product/types/productFormField';

const CreateProductPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductType>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductType | null>(null);

  const price = useWatch({ name: 'price', control }) || 0;
  const discountPercentage = useWatch({ name: 'discountPercentage', control }) || 0;
  const finalPrice = price * (1 - discountPercentage / 100);

  const onValid = (data: ProductType) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  return (
    <section className="flex flex-col gap-4 justify-center items-center h-screen w-full">
      <Toaster />
      <Dialog.Root open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="bg-white p-4 rounded-md shadow-md max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold">
              입력한 정보로 상품을 등록할까요?
            </Dialog.Title>
            <div className="mt-2 text-sm text-gray-700">
              <p>상품명: {formData?.title}</p>
              <p>가격: {formData?.price?.toLocaleString()}원</p>
              <p>할인율: {formData?.discountPercentage}%</p>
              <p>브랜드: {formData?.brand}</p>
              <p>최종 가격: {finalPrice.toLocaleString()}원</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-1 text-sm rounded border"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  if (formData) {
                    try {
                      setIsLoading(true);

                      await createProduct(formData);
                      toast.success('상품이 생성되었습니다.');

                      // TODO:상품 리스트 페이지로 이동
                    } catch (error) {
                      console.error(error);
                      toast.error('상품 생성에 실패했습니다.');
                    } finally {
                      setShowConfirmModal(false);
                      setIsLoading(false);
                    }
                  }
                }}
                disabled={isLoading}
                className="px-4 py-1 text-sm rounded bg-blue-500 text-white disabled:opacity-50"
              >
                {isLoading ? '생성 중...' : '확인'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <h2 className="text-2xl font-bold">Create Product</h2>
      <Form.Root onSubmit={handleSubmit(onValid)} className="flex flex-col gap-2 w-full max-w-md">
        {formFields.map((field) => (
          <Form.Field className="flex flex-col gap-2" key={field.name} name={field.name}>
            <div className="flex gap-2 items-center justify-between">
              <Form.Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {field.required && <span className="text-red-500">*</span>}
                <span className={field.required ? 'font-bold' : ''}>{field.label}</span>
              </Form.Label>
              {errors[field.name] && (
                <Form.Message className="text-red-500 text-xs">
                  {errors[field.name]?.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>{renderers[field.type](field, register)}</Form.Control>
          </Form.Field>
        ))}

        <div>최종 가격: {finalPrice.toLocaleString()}</div>

        <Form.Submit
          disabled={!isValid}
          className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create
        </Form.Submit>
      </Form.Root>
    </section>
  );
};

const renderers = {
  text: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <input
      className="border border-gray-300 rounded-md p-2"
      type="text"
      placeholder={field.placeholder}
      {...register(field.name)}
    />
  ),
  number: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <input
      className="border border-gray-300 rounded-md p-2"
      type="number"
      min={0}
      placeholder={field.placeholder}
      {...register(field.name, { valueAsNumber: true, required: field.required })}
    />
  ),
  textarea: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <textarea
      className="border border-gray-300 rounded-md p-2 resize-none"
      placeholder={field.placeholder}
      {...register(field.name)}
    />
  ),
  select: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => {
    if (field.type !== 'select') return null;

    const defaultValue = field.options.find((option) => option.selected)?.value;

    return (
      <select
        className="border border-gray-300 rounded-md p-2"
        defaultValue={defaultValue}
        {...register(field.name)}
        required={field.required}
      >
        <option className="text-gray-500" value="" disabled>
          {field.placeholder}
        </option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
};

export default CreateProductPage;
