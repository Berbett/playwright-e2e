import { Page, expect } from '@playwright/test';
import TokioElements from '../elements/TokioElements';
import BasePage from './BasePage';

export default class TokioPage extends BasePage {
  readonly tokioElements: TokioElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.tokioElements = new TokioElements(page);
  }

  async acceptCookies(): Promise<void> {
    const button = this.tokioElements.getAcceptCookiesButton();
    if (await button.isVisible({ timeout: 5000 }).catch(() => false)) {
      await button.click();
    }
  }

  async openCategory(name: string): Promise<void> {
    await this.tokioElements.getMenuLink(name).click();
  }

  async searchProduct(product: string): Promise<void> {
    await this.tokioElements.getSearchButton().click();
    await this.tokioElements.getSearchField().fill(product);
    await this.tokioElements.getSearchField().press('Enter');
  }

  async checkProductVisible(product: string): Promise<void> {
    await expect(this.tokioElements.getProductTitle(product)).toBeVisible();
  }

  async addProductToCart(product: string): Promise<void> {
    await expect(this.tokioElements.getCartButton()).toContainText('0');
    await this.tokioElements.getAddToCartButton(product).click();
  }

  async checkCartCount(count: string): Promise<void> {
    await expect(this.tokioElements.getCartButton()).toContainText(count);
  }

  async checkProductHeading(text: RegExp): Promise<void> {
    await expect(this.tokioElements.getProductHeading()).toHaveText(text);
  }
}
