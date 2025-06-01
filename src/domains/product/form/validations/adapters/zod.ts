import { z } from 'zod';

import { Validation } from '@/common/types/form/formValidation';
import { TextField } from '@/common/types/form/formField';

interface BuildZodSchema {
  type: TextField['type'] | 'select';
  validationRule: Validation;
  optional?: boolean;
}

const buildTextZodSchema = (rule: Validation, optional?: boolean) => {
  const base = z.string({
    required_error: rule.error?.message,
  });

  const validators = [
    rule.minLength && ((s: z.ZodString) => s.min(rule.minLength!.value, rule.minLength!.message)),
    rule.maxLength && ((s: z.ZodString) => s.max(rule.maxLength!.value, rule.maxLength!.message)),
    rule.pattern && ((s: z.ZodString) => s.regex(rule.pattern!.value, rule.pattern!.message)),
    rule.error && ((s: z.ZodString) => s.refine((val) => !!val, { message: rule.error!.message })),
  ].filter(Boolean) as ((schema: z.ZodString) => z.ZodString)[];

  const schema = validators.reduce((schema, fn) => fn(schema), base);

  return optional ? schema.optional() : schema;
};

const buildNumberZodSchema = (rule: Validation, optional?: boolean) => {
  const validators = [
    rule.min && ((s: z.ZodNumber) => s.min(rule.min!.value, rule.min!.message)),
    rule.max && ((s: z.ZodNumber) => s.max(rule.max!.value, rule.max!.message)),
    rule.error && ((s: z.ZodNumber) => s.refine((val) => !!val, { message: rule.error!.message })),
  ].filter(Boolean) as ((schema: z.ZodNumber) => z.ZodNumber)[];

  const base = validators.reduce(
    (schema, fn) => fn(schema),
    z.number({
      required_error: rule.error?.message,
    })
  );

  const schema = z.preprocess((val) => {
    if (!val) return optional ? undefined : 0;

    const num = Number(val);

    return isNaN(num) ? (optional ? undefined : 0) : num;
  }, base);

  return optional ? schema.optional() : schema;
};

const buildSelectZodSchema = (rule: Validation) => {
  const { error } = rule;

  return error ? z.string().refine((val) => !!val, { message: error!.message }) : z.string();
};

const zodBuilders = {
  text: buildTextZodSchema,
  textarea: buildTextZodSchema,
  number: buildNumberZodSchema,
  select: buildSelectZodSchema,
};

export const buildZodSchema = ({ type, validationRule, optional }: BuildZodSchema) => {
  const builder = zodBuilders[type];

  return builder(validationRule, optional);
};
