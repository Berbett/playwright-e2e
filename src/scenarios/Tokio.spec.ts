import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import TokioPage from '../support/pages/TokioPage';

test.describe('Tókio Brand', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let tokioPage: TokioPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.tokio')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    tokioPage = new TokioPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await tokioPage.acceptCookies();
  });

  test('deve navegar para a categoria Para ele e listar produtos', async ({
    page
  }) => {
    await tokioPage.openCategory('Para ele');
    await expect(page).toHaveURL(/\/prod-categoria\/para-ele\//);
    await expect(page).toHaveTitle(/Para ele/);
    await tokioPage.checkProductVisible('KURO');
  });

  test('deve buscar pelo produto KURO e exibir o resultado', async ({
    page
  }) => {
    await tokioPage.searchProduct('kuro');
    await expect(page).toHaveURL(/tokio_busca=kuro/);
    await tokioPage.checkProductVisible('KURO');
  });

  test('deve adicionar o produto KURO ao carrinho', async ({ page }) => {
    await page.goto(`${BASE_URL}produto/kuro/`, {
      waitUntil: 'domcontentloaded'
    });
    await tokioPage.checkProductHeading(/KURO/);
    await tokioPage.addProductToCart('KURO');
    await tokioPage.checkCartCount('1');
  });
});
