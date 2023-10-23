import { expect } from '@playwright/test'

class PaymentPage {
  constructor(page) {
    this.page = page

    // Discount Code
    this.iframe = this.page.frameLocator('iframe[src="/active-discount"]')
    this.discountCode = this.iframe.locator('p[data-qa="discount-code"]')
    this.discountCodeInput = this.page.locator(
      'input[data-qa="discount-code-input"]'
    )
    this.submitDiscountButton = this.page.locator(
      'button[data-qa="submit-discount-button"]'
    )

    this.totalAmount = this.page.locator('span[data-qa="total-value"]')
    this.totalDiscount = this.page.locator(
      'span[data-qa="total-with-discount-value"]'
    )
    this.discountActivatedText = this.page.locator(
      'p[data-qa="discount-active-message"]'
    )

    // Credit Card
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
    await this.submitDiscountButton.waitFor()

    expect(await this.totalDiscount.isVisible()).toBe(false) // Check element is NOT visible
    expect(await this.discountActivatedText.isVisible()).toBe(false) // Check element is NOT visible

    const code = await this.discountCode.innerText()
    console.log('discountCode: ' + code)

    // Option1 - Copy Page into input field
    // Note this will fail !
    // Why ? Because input only accepts one character at a time.
    // expect(await this.discountCodeInput.inputValue()).toBe(code)

    // Wait to see input contains the value which was enteres
    // According to docs:
    // toHaveValue() - Ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.
    // all the toHaveValue() has a retry funcitonality which retries and retries until it succeeds
    await this.discountCodeInput.fill(code)
    await expect(this.discountCodeInput).toHaveValue(code)

    // Option2 - Keyword input for slow typing
    // await this.discountCodeInput.focus()
    // await this.page.keyboard.type(code, { delay: 1000 }) // Slow Type 1 second per
    // expect(await this.discountCodeInput.inputValue()).toBe(code)

    // Click on Discount Button
    await this.submitDiscountButton.click()

    // Wait for Elements to appear
    await this.totalAmount.waitFor()
    await this.totalDiscount.waitFor()
    await this.discountActivatedText.waitFor()

    // Validate Discount is smaller than total
    let total = await this.totalAmount.innerText()
    total = parseInt(total.replace('$', ''))

    let discountTotal = await this.totalDiscount.innerText()
    discountTotal = parseInt(discountTotal.replace('$', ''))

    expect(discountTotal).toBeLessThan(total)
  }
}

export { PaymentPage }
