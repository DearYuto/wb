import { ProductFormFieldType } from '../../types/productFormField';

const formFields: ProductFormFieldType[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: '상품명',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: '상품 설명',
    required: false,
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    placeholder: '상품 가격',
    required: true,
  },
  {
    name: 'discountPercentage',
    label: 'Discount Percentage',
    type: 'number',
    placeholder: '할인율',
    required: false,
  },
  {
    name: 'brand',
    label: 'Brand',
    type: 'select',
    placeholder: '브랜드',
    required: true,
    options: [
      { value: 'apple', label: 'Apple', selected: false },
      { value: 'samsung', label: 'Samsung', selected: false },
      { value: 'weebur', label: 'Weebur', selected: true },
    ],
  },
];

export default formFields;
