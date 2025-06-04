import formValidationRule from '@/domains/product/form/validations/rules/formValidationRule';
import { test, expect } from '@playwright/test';

const PRODUCT_CREATE_PAGE_ENDPOINT = '/products/new';

test.describe(`${PRODUCT_CREATE_PAGE_ENDPOINT}상품 생성 페이지 테스트를 시작합니다.`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_CREATE_PAGE_ENDPOINT);
  });

  test('상품 생성 페이지가 정상적으로 렌더링됩니다.', async ({ page }) => {
    await expect(page).toHaveURL(PRODUCT_CREATE_PAGE_ENDPOINT);
  });

  test('상품 생성 페이지에 폼 필드가 모두 렌더링됩니다.', async ({ page }) => {
    const fields = [
      { label: 'Title', type: 'text' },
      { label: 'Description', type: 'textarea' },
      { label: 'Price', type: 'number' },
      { label: 'Discount Percentage', type: 'number' },
      { label: 'Brand', type: 'select' },
    ];

    for (const field of fields) {
      const locator = page.getByLabel(field.label);
      await expect(locator).toBeVisible();

      if (field.type === 'textarea' || field.type === 'select') {
        await expect(locator).toHaveJSProperty('tagName', field.type.toUpperCase());
      } else {
        await expect(locator).toHaveAttribute('type', field.type);
      }
    }
  });

  test('Brand select에는 Apple, Samsung, Weebur 옵션이 존재합니다.', async ({ page }) => {
    const brandSelect = page.getByLabel('Brand');
    const options = ['Apple', 'Samsung', 'Weebur'];

    for (const option of options) {
      await brandSelect.selectOption({ label: option });
      await expect(brandSelect).toHaveValue(option.toLowerCase());
    }
  });

  test('Title 필드는 15자 이내로 입력해야 합니다.', async ({ page }) => {
    const titleInput = page.getByLabel('Title');
    await titleInput.fill('유토'.repeat(20));

    const message = formValidationRule.title.maxLength?.message;

    await expect(page.getByText(message!)).toBeVisible();
  });

  test('Price는 1,000원 이상이어야 합니다.', async ({ page }) => {
    const priceInput = page.getByLabel('Price');
    await priceInput.fill('999');

    const message = formValidationRule.price.min?.message;

    await expect(page.getByText(message!)).toBeVisible();
  });
});
