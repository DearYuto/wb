'use client';

import { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

import { ProductType } from '@/domains/product/types/product';
import * as Form from '@radix-ui/react-form';
import { createProduct } from '@/domains/product/services/createProductService';
import { zodResolver } from '@hookform/resolvers/zod';
import productFormSchema from '@/domains/product/form/validations/schemas/productFormSchema';
import formFields from '@/domains/product/form/fields/formFields';
import { ProductFormFieldType } from '@/domains/product/types/productFormField';

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productFormSchema),
  });

  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const onSubmitForm = async (data: ProductType) => {
    const product = await createProduct(data);

    // TODO: 모달 처리 후 서브밋
    console.log(product);
  };

  return (
    <section>
      <h2>Create Product</h2>
      <Form.Root onSubmit={handleSubmit(onSubmitForm)}>
        {formFields.map((field) => (
          <Form.Field key={field.name} name={field.name}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control asChild>{renderers[field.type](field, register)}</Form.Control>
            {errors[field.name] && <Form.Message>{errors[field.name]?.message}</Form.Message>}
          </Form.Field>
        ))}

        <Form.Submit
          onClick={() => {
            console.log('first');
          }}
        >
          Create
        </Form.Submit>
      </Form.Root>
      <div>최종 가격: {price * (1 - discountPercentage / 100)}</div>
    </section>
  );
};

const renderers = {
  text: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <input type="text" placeholder={field.placeholder} {...register(field.name)} />
  ),
  number: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <input
      value={0}
      type="number"
      placeholder={field.placeholder}
      {...register(field.name, {
        valueAsNumber: true,
        required: field.required,
      })}
    />
  ),
  textarea: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
    <textarea placeholder={field.placeholder} {...register(field.name)} />
  ),
  select: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => {
    if (field.type !== 'select') return null;

    return (
      <select defaultValue="" {...register(field.name)} required={field.required}>
        <option value="" disabled>
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
