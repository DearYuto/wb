import { test, expect } from '@playwright/test';

const PRODUCT_CREATE_PAGE_ENDPOINT = '/products/new';

test.describe(`${PRODUCT_CREATE_PAGE_ENDPOINT}상품 생성 페이지 테스트를 시작합니다.`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_CREATE_PAGE_ENDPOINT);
  });

  test('상품 생성 페이지가 정상적으로 렌더링됩니다.', async ({ page }) => {
    const ENDPOINT = '/products/new';

    await page.goto(ENDPOINT);

    await expect(page).toHaveURL(ENDPOINT);
  });

  test('상품 생성 페이지에 폼 필드가 모두 렌더링됩니다.', async ({ page }) => {
    const fields = [
      { label: 'Title' },
      { label: 'Description' },
      { label: 'Price' },
      { label: 'Discount Percentage' },
      { label: 'Brand' },
    ];

    for (const { label } of fields) {
      const input = page.getByLabel(label);

      await expect(input).toBeVisible();
    }
  });
});
