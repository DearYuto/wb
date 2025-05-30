import * as Form from '@radix-ui/react-form';
import { ProductFormFieldType } from '@/domains/product/types/productFormField';

export interface ProductFormFieldProps extends ProductFormFieldType {
  children: React.ReactNode;
  error?: {
    message: string;
  };
}

const ProductFormField = ({ name, label, children, error }: ProductFormFieldProps) => {
  return (
    <Form.Field name={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control asChild>{children}</Form.Control>
      {error && <Form.Message>{error.message}</Form.Message>}
    </Form.Field>
  );
};

export default ProductFormField;
