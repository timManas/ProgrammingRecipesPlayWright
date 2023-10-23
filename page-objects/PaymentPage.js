import { expect } from '@playwright/test'

class PaymentPage {
  constructor(page) {
    this.page = page

    // iFrame
    this.iframe = this.page.frameLocator('iframe[src="/active-discount"]')
    this.discountCode = this.iframe.locator('p[data-qa="discount-code"]')

    this.discountCodeInput = this.page.locator(
      'input[data-qa="discount-code-input"]'
    )
    this.submitDiscountButton = this.page.locator(
      'button[data-qa="submit-discount-button"]'
    )
    this.creditCardOwner = this.page.locator('data-qa="credit-card-owner"')
    this.creditCardNumber = this.page.locator(
      'input[placeholder="Credit card number"]'
    )
    this.validUntil = this.page.locator('input[name="expires"]')
    this.creditCardCVC = this.page.locator('input[class~="credit-card-cvc"]')
    this.payButton = this.page.locator(
      'button[class~="pay-button"][class~="shadow-md"]'
    )
  }

  activateDiscount = async () => {
    // Wait until elements appear
    await this.discountCode.waitFor()
    await this.discountCodeInput.waitFor()

    const code = await this.discountCode.innerText()
    console.log('discountCode: ' + code)

    // Enter code
    await this.discountCodeInput.fill(code)

    // Note this will fail !
    // Why ? Because input only accepts one character at a time.
    // expect(await this.discountCodeInput.inputValue()).toBe(code)

    // Wait to see input contains the value which was enteres
    // According to docs:
    // toHaveValue() - Ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.
    // all the toHaveValue() has a retry funcitonality which retries and retries until it succeeds
    await expect(this.discountCodeInput).toHaveValue(code)
  }
}

export { PaymentPage }
