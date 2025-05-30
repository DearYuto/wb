import * as Form from '@radix-ui/react-form';
import { ProductFormFieldType } from '@/domains/product/types/productFormField';
import ProductFormField from './ProductFormField';
import { ProductType } from '@/domains/product/types/product';
interface ProductFormProps {
  fields: ProductFormFieldType[];
  onSubmit: (data: ProductType) => void;
}

const ProductForm = ({ fields, onSubmit }: ProductFormProps) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    onSubmit(data as unknown as ProductType);
  };

  return (
    <Form.Root onSubmit={submitHandler}>
      {fields.map((field) => (
        <ProductFormField key={field.name} {...field}>
          {field.children}
        </ProductFormField>
      ))}
      <Form.Submit>Submit</Form.Submit>
    </Form.Root>
  );
};

export default ProductForm;
