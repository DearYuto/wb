import { z } from 'zod';

import { Validation } from '@/common/types/form/formValidation';
import { TextField } from '@/common/types/form/formField';

interface BuildZodSchema {
  type: TextField['type'] | 'select';
  validationRule: Validation;
}

const buildTextZodSchema = (rule: Validation) => {
  const validators = [
    rule.minLength && ((s: z.ZodString) => s.min(rule.minLength!.value, rule.minLength!.message)),
    rule.maxLength && ((s: z.ZodString) => s.max(rule.maxLength!.value, rule.maxLength!.message)),
    rule.pattern && ((s: z.ZodString) => s.regex(rule.pattern!.value, rule.pattern!.message)),
    rule.error && ((s: z.ZodString) => s.refine((val) => !!val, { message: rule.error!.message })),
  ].filter(Boolean) as ((schema: z.ZodString) => z.ZodString)[];

  return validators.reduce((schema, apply) => apply(schema), z.string());
};

const buildNumberZodSchema = (rule: Validation) => {
  const validators = [
    rule.min && ((s: z.ZodNumber) => s.min(rule.min!.value, rule.min!.message)),
    rule.max && ((s: z.ZodNumber) => s.max(rule.max!.value, rule.max!.message)),
    rule.error && ((s: z.ZodNumber) => s.refine((val) => !!val, { message: rule.error!.message })),
  ].filter(Boolean) as ((schema: z.ZodNumber) => z.ZodNumber)[];

  return validators.reduce((schema, apply) => apply(schema), z.number());
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

export const buildZodSchema = ({ type, validationRule }: BuildZodSchema) => {
  return zodBuilders[type](validationRule);
};
