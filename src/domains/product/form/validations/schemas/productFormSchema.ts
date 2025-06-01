import { z } from 'zod';

import formFields from '@/domains/product/form/fields/formFields';
import { buildZodSchema } from '@/domains/product/form/validations/adapters/zod';
import { ProductType } from '@/domains/product/types/product';
import formValidationRule from '@/domains/product/form/validations/rules/formValidationRule';

const productFormSchema = () => {
  const schema = {} as {
    [K in keyof ProductType]: z.ZodTypeAny;
  };

  formFields.forEach((field) => {
    const rule = formValidationRule[field.name];

    if (!rule) return;

    const fieldSchema = buildZodSchema({
      type: field.type,
      validationRule: rule,
    });

    schema[field.name] = fieldSchema;
  });

  return z.object(schema) as z.ZodType<ProductType>;
};

export default productFormSchema();
