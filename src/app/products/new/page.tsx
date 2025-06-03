'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ProductType } from '@/domains/product/types/product';
import * as Form from '@radix-ui/react-form';
import { createProduct } from '@/domains/product/services/createProductService';
import { zodResolver } from '@hookform/resolvers/zod';
import productFormSchema from '@/domains/product/form/validations/schemas/productFormSchema';
import formFields from '@/domains/product/form/fields/formFields';
import CreateConfirmModal from '@/domains/product/components/new/CreateConfirmModal';
import Button from '@/common/components/Button';
import ProductFormFieldRenderer from '@/domains/product/components/new/ProductFormFieldRenderer';
import { useFinalPrice } from '@/domains/product/hooks/useFinalPrice';

const CreateProductPage = () => {
  const router = useRouter();

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
  const [formData, setFormData] = useState<ProductType>();

  const finalPrice = useFinalPrice(control);

  const onValid = (data: ProductType) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  const onSubmitForm = async (data: ProductType) => {
    try {
      setIsLoading(true);
      await createProduct(data);
      toast.success('상품이 등록되었습니다.');
      router.push('/products');
    } catch (error) {
      console.error(error);
      toast.error('상품 생성에 실패했습니다.');
    } finally {
      setShowConfirmModal(false);
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-6 flex flex-col items-center justify-center">
      {formData && (
        <CreateConfirmModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => onSubmitForm(formData)}
          isLoading={isLoading}
          formData={formData}
          finalPrice={finalPrice}
        />
      )}

      <div className="relative mb-6 flex flex-col items-center justify-center">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-5 w-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">상품 등록</h2>
        <p className="mt-1 text-sm text-gray-500">새로운 상품 정보를 입력해 주세요.</p>
      </div>
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
    </section>
  );
};

export default CreateProductPage;
