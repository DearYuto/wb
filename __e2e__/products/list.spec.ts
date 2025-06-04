import { test, expect } from '@playwright/test';

const PRODUCT_LIST_PAGE_ENDPOINT = '/products';
const API_ENDPOINT = '**/api/products/**';

test.describe(`${PRODUCT_LIST_PAGE_ENDPOINT} 상품 리스트 페이지 테스트를 시작합니다.`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_LIST_PAGE_ENDPOINT);
  });

  test('상품 리스트 페이지가 정상적으로 렌더링됩니다.', async ({ page }) => {
    await expect(page).toHaveURL(PRODUCT_LIST_PAGE_ENDPOINT);
  });

  test('페이지 로드 시간이 500ms 이하일 때 로딩 스피너가 나타나지 않는다.', async ({ page }) => {
    const spinner = page.locator('[data-testid="spinner"]');

    await expect(spinner).not.toBeVisible();
  });

  test('페이지 로드 시간이 500ms 이상일 때 로딩 스피너가 나타난다.', async ({ page, context }) => {
    await context.route(API_ENDPOINT, async (route) => {
      await new Promise((res) => setTimeout(res, 700));
      await route.continue();
    });

    await page.goto(PRODUCT_LIST_PAGE_ENDPOINT);

    const spinner = page.locator('[data-testid="spinner"]');

    await page.waitForTimeout(600);
    await expect(spinner).toBeVisible();
  });

  test('500ms 이상 로딩 시 스피너가 나타났다가 이후 상품 카드가 렌더링된다.', async ({
    page,
    context,
  }) => {
    await context.route(API_ENDPOINT, async (route) => {
      await new Promise((res) => setTimeout(res, 1000));
      await route.continue();
    });

    const spinner = page.locator('[data-testid="spinner"]');

    await page.waitForTimeout(400); // 400ms
    await expect(spinner).not.toBeVisible();

    await page.waitForTimeout(200); // 600ms
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(300); // 900ms
    await expect(spinner).not.toBeVisible();

    await expect(page.getByTestId('product-card').first()).toBeVisible();
  });
});
