import { UseFormRegister } from 'react-hook-form';

import { ProductFormFieldType } from '@/domains/product/types/productFormField';
import { ProductType } from '@/domains/product/types/product';

interface ProductFormFieldRendererProps {
  field: ProductFormFieldType;
  register: UseFormRegister<ProductType>;
}

const ProductFormFieldRenderer = ({ field, register }: ProductFormFieldRendererProps) => {
  const fieldRenderer = {
    text: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
      <input
        id={field.name}
        className="rounded-md border border-gray-300 p-2"
        type="text"
        placeholder={field.placeholder}
        {...register(field.name)}
      />
    ),
    number: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
      <input
        id={field.name}
        className="rounded-md border border-gray-300 p-2"
        type="number"
        min={0}
        placeholder={field.placeholder}
        {...register(field.name, { valueAsNumber: true, required: field.required })}
      />
    ),
    textarea: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => (
      <textarea
        id={field.name}
        className="resize-none rounded-md border border-gray-300 p-2"
        placeholder={field.placeholder}
        {...register(field.name)}
      />
    ),
    select: (field: ProductFormFieldType, register: UseFormRegister<ProductType>) => {
      if (field.type !== 'select') return null;

      const defaultValue = field.options.find((option) => option.selected)?.value;

      return (
        <select
          id={field.name}
          className="rounded-md border border-gray-300 p-2"
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

  return fieldRenderer[field.type](field, register);
};

export default ProductFormFieldRenderer;
