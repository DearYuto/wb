'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ProductType } from '@/domains/product/types/product';
import { createProduct } from '@/domains/product/services/createProductService';
import { zodResolver } from '@hookform/resolvers/zod';
import productFormSchema from '@/domains/product/form/validations/schemas/productFormSchema';
import CreateConfirmModal from '@/domains/product/components/new/CreateConfirmModal';
import { useFinalPrice } from '@/domains/product/hooks/useFinalPrice';
import ProductForm from '@/domains/product/components/new/ProductForm';
import { useForm } from 'react-hook-form';
import ProductFormHeader from '@/domains/product/components/new/ProductFormHeader';

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

      <ProductFormHeader />
      <ProductForm
        onValid={onValid}
        isValid={isValid}
        register={register}
        errors={errors}
        control={control}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default CreateProductPage;
