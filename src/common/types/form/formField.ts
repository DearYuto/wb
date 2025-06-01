export type BaseField = {
  label: string;
  placeholder?: string;
  required: boolean;
};

export type TextField = BaseField & {
  type: 'text' | 'textarea' | 'number';
};

export type SelectField = BaseField & {
  type: 'select';
  options: {
    value: string;
    label: string;
    selected: boolean;
  }[];
};

export type FormFieldType = TextField | SelectField;
