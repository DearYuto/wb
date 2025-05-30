'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Form from '@radix-ui/react-form';

import { ProductType } from '@/domains/product/types/product';

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const onSubmitForm = (data: ProductType) => {
    console.log(data);
  };

  return (
    <section>
      <h2>Create Product</h2>
      <Form.Root onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Field name="title">
          <Form.Label>Title</Form.Label>
          <Form.Control asChild>
            <input
              {...register('title', {
                required: '필수 입력',
                maxLength: { value: 15, message: '15자 이하로 입력해주세요' },
              })}
            />
          </Form.Control>
          {errors.title && <Form.Message>{errors.title.message}</Form.Message>}
        </Form.Field>

        <Form.Field name="description">
          <Form.Label>Description</Form.Label>
          <Form.Control asChild>
            <textarea rows={4} />
          </Form.Control>
        </Form.Field>

        <Form.Field name="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            asChild
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                setPrice(0);
              }

              if (Number.isNaN(Number(value))) {
                return;
              }

              setPrice(Number(value));
            }}
          >
            <input
              type="number"
              {...register('price', {
                required: '필수 입력',
                min: { value: 1000, message: '1,000원 이상 입력해주세요' },
              })}
            />
          </Form.Control>
          {errors.price && <Form.Message>{errors.price.message}</Form.Message>}
        </Form.Field>

        <Form.Field name="discountPercentage">
          <Form.Label>Discount Percentage</Form.Label>
          <Form.Control
            asChild
            onChange={(e) => {
              const value = e.target.value;

              if (!value) {
                setDiscountPercentage(0);
                return;
              }

              if (Number.isNaN(Number(value))) {
                return;
              }

              setDiscountPercentage(Number(value));
            }}
          >
            <input
              min={0}
              max={100}
              type="number"
              {...register('discountPercentage', {
                min: { value: 0, message: '0 이상의 할인율을 입력해주세요' },
                max: { value: 100, message: '100 이하의 할인율을 입력해주세요' },
              })}
            />
          </Form.Control>
          {errors.discountPercentage && (
            <Form.Message>{errors.discountPercentage.message}</Form.Message>
          )}
        </Form.Field>

        <Form.Field name="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control asChild>
            <select
              required
              {...register('brand', {
                required: '필수 선택',
              })}
            >
              <optgroup label="브랜드">
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option selected value="weebur">
                  Weebur
                </option>
              </optgroup>
            </select>
          </Form.Control>
          {errors.brand && <Form.Message>{errors.brand.message}</Form.Message>}
        </Form.Field>

        <Form.Submit>Create</Form.Submit>
      </Form.Root>

      <div>최종 가격: {price * (1 - discountPercentage / 100)}</div>
    </section>
  );
};

export default CreateProductPage;
