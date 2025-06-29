import formFields from '@/domains/product/form/fields/formFields';
import formValidationRule from '@/domains/product/form/validations/rules/formValidationRule';
import { test, expect } from '@playwright/test';

const PRODUCT_CREATE_PAGE_ENDPOINT = '/products/new';

test.describe(`${PRODUCT_CREATE_PAGE_ENDPOINT}상품 생성 페이지 테스트를 시작합니다.`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_CREATE_PAGE_ENDPOINT);
  });

  test('상품 생성 페이지가 정상적으로 렌더링됩니다.', async ({ page }) => {
    // given
    const expectedUrl = PRODUCT_CREATE_PAGE_ENDPOINT;

    // when
    await page.goto(expectedUrl);

    // then
    await expect(page).toHaveURL(expectedUrl);
  });

  test('상품 생성 페이지에 폼 필드가 모두 렌더링됩니다.', async ({ page }) => {
    // given
    const fields = [
      { label: 'Title', type: 'text' },
      { label: 'Description', type: 'textarea' },
      { label: 'Price', type: 'number' },
      { label: 'Discount Percentage', type: 'number' },
      { label: 'Brand', type: 'select' },
    ];

    // when & then
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
    // given
    const brandSelect = page.getByLabel('Brand');
    const options = ['Apple', 'Samsung', 'Weebur'];

    // when
    for (const option of options) {
      await brandSelect.selectOption({ label: option });

      // then
      await expect(brandSelect).toHaveValue(option.toLowerCase());
    }
  });

  test('Title 필드는 15자 이내로 입력해야 합니다.', async ({ page }) => {
    // given
    const titleField = formFields.find((field) => field.name === 'title')!;
    const titleInput = page.getByLabel(titleField.label);
    const invalidTitle = '유토'.repeat(20);
    const expectedMessage = formValidationRule.title.maxLength?.message;

    // when
    await titleInput.fill(invalidTitle);

    // then
    await expect(page.getByText(expectedMessage!)).toBeVisible();
  });

  test('Price는 1,000원 이상이어야 합니다.', async ({ page }) => {
    // given
    const priceField = formFields.find((field) => field.name === 'price')!;
    const priceInput = page.getByLabel(priceField.label);
    const invalidPrice = '999';
    const expectedMessage = formValidationRule.price.min?.message;

    // when
    await priceInput.fill(invalidPrice);

    // then
    await expect(page.getByText(expectedMessage!)).toBeVisible();
  });

  test('Discount Percentage는 100 이내여야 합니다.', async ({ page }) => {
    // given
    const discountField = formFields.find((field) => field.name === 'discountPercentage')!;
    const discountInput = page.getByLabel(discountField.label);
    const invalidDiscount = '101';
    const expectedMessage = formValidationRule.discountPercentage.max?.message;

    // when
    await discountInput.fill(invalidDiscount);

    // then
    await expect(page.getByText(expectedMessage!)).toBeVisible();
  });

  test('최종 가격이 실시간으로 계산되어 표시됩니다.', async ({ page }) => {
    // given
    const priceInput = page.getByLabel('Price');
    const discountInput = page.getByLabel('Discount Percentage');
    const price = '10000';
    const discount = '20';
    const expectedFinalPrice = '8,000';

    // when
    await priceInput.fill(price);
    await discountInput.fill(discount);

    // then
    const finalPrice = page.getByText(expectedFinalPrice);
    await expect(finalPrice).toBeVisible();
  });

  test('폼 제출에 성공하면 상품 리스트 페이지로 이동합니다.', async ({ page }) => {
    // given
    const validProduct = {
      title: "Yuto's Product",
      price: '10000',
      brand: 'Apple',
    };

    // when
    await page.getByLabel('Title').fill(validProduct.title);
    await page.getByLabel('Price').fill(validProduct.price);
    await page.getByLabel('Brand').selectOption({ label: validProduct.brand });
    await page.getByRole('button', { name: '등록하기' }).click();
    await page.getByRole('button', { name: '확인' }).click();

    // then
    await expect(page).toHaveURL('/products');
  });

  test('필수 필드가 비어있는 경우 버튼이 비활성화됩니다.', async ({ page }) => {
    // given
    const invalidProduct = {
      title: "Yuto's Product",
      price: '',
    };

    // when
    await page.getByLabel('Title').fill(invalidProduct.title);
    await page.getByLabel('Price').fill(invalidProduct.price);

    // then
    const submitButton = page.getByRole('button', { name: '등록하기' });
    await expect(submitButton).toBeDisabled();
  });
});
