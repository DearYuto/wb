import { test, expect } from '@playwright/test';

const PRODUCT_LIST_PAGE_ENDPOINT = '/products';
const API_ENDPOINT = '**/api/products/**';
const MOCK_API_URL = 'https://dummyjson.com/products?limit=20';

test.describe(`${PRODUCT_LIST_PAGE_ENDPOINT} 상품 리스트 페이지 테스트를 시작합니다.`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_LIST_PAGE_ENDPOINT);
  });

  test('상품 리스트 페이지가 정상적으로 렌더링됩니다.', async ({ page }) => {
    // given
    const expectedUrl = PRODUCT_LIST_PAGE_ENDPOINT;

    // when
    await page.goto(expectedUrl);

    // then
    await expect(page).toHaveURL(expectedUrl);
  });

  test('페이지 로드 시간이 500ms 이하일 때 로딩 스피너가 나타나지 않는다.', async ({ page }) => {
    // given
    const spinner = page.locator('[data-testid="spinner"]');

    // then
    await expect(spinner).not.toBeVisible();
  });

  test('페이지 로드 시간이 500ms 이상일 때 로딩 스피너가 나타난다.', async ({ page, context }) => {
    // given
    await context.route(API_ENDPOINT, async (route) => {
      await new Promise((res) => setTimeout(res, 700));
      await route.continue();
    });

    // when
    await page.goto(PRODUCT_LIST_PAGE_ENDPOINT);
    const spinner = page.locator('[data-testid="spinner"]');

    // then
    await page.waitForTimeout(600);
    await expect(spinner).toBeVisible();
  });

  test('500ms 이상 로딩 시 스피너가 나타났다가 이후 상품 카드가 렌더링된다.', async ({
    page,
    context,
  }) => {
    // given
    await context.route(API_ENDPOINT, async (route) => {
      await new Promise((res) => setTimeout(res, 1000));
      await route.continue();
    });

    const spinner = page.locator('[data-testid="spinner"]');

    // when & then
    await page.waitForTimeout(400); // 400ms
    await expect(spinner).not.toBeVisible();

    await page.waitForTimeout(200); // 600ms
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(300); // 900ms
    await expect(spinner).not.toBeVisible();

    await expect(page.getByTestId('product-card').first()).toBeVisible();
  });

  test('상품 리스트는 초기 페이지 진입 시 20개의 아이템만 노출됩니다.', async ({ page }) => {
    // given
    const expectedItemCount = 20;

    // when
    const productCards = page.getByTestId('product-card');

    // then
    await expect(productCards).toHaveCount(expectedItemCount);
  });

  test('각 상품 카드는 필수 정보를 포함합니다.', async ({ page }) => {
    // given
    const requiredInfo = [
      { selector: '[data-testid="product-title"]', label: '상품명' },
      { selector: '[data-testid="product-description"]', label: '상품설명' },
      { selector: '[data-testid="product-thumbnail"]', label: '썸네일 이미지' },
      { selector: '[data-testid="product-rating"]', label: '별점' },
      { selector: '[data-testid="product-reviews"]', label: '리뷰 수' },
    ];

    // when
    const firstProductCard = page.getByTestId('product-card').first();

    // then
    for (const info of requiredInfo) {
      const element = firstProductCard.locator(info.selector);
      await expect(element).toBeVisible();
    }
  });

  test('View 방식은 리스트형 또는 그리드형으로 표시됩니다.', async ({ page }) => {
    const listView = page.getByTestId('list');
    const gridView = page.getByTestId('grid');

    await Promise.race([
      listView.waitFor({ state: 'visible' }),
      gridView.waitFor({ state: 'visible' }),
    ]);

    const isListView = await listView.isVisible();
    const isGridView = await gridView.isVisible();

    expect(isListView || isGridView).toBeTruthy();
    expect(isListView && isGridView).toBeFalsy();
  });
});
