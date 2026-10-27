import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class TokioElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getAcceptCookiesButton(): Locator {
    return this.page.getByRole('button', { name: 'Aceitar tudo' });
  }

  getMenuLink(name: string): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('navigation', { name: 'Menu' })
      .getByRole('link', { name });
  }

  getSearchButton(): Locator {
    return this.page.getByRole('button', { name: 'Pesquisar produtos' });
  }

  getSearchField(): Locator {
    return this.page.locator('input[name="tokio_busca"]:visible').first();
  }

  getProductTitle(name: string): Locator {
    return this.page.getByRole('heading', { level: 2, name, exact: true });
  }

  getProductHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  getAddToCartButton(product: string): Locator {
    return this.page.getByRole('button', {
      name: `Adicionar "${product}" ao carrinho`
    });
  }

  getCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Open cart' });
  }
}
