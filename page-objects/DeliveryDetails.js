import { expect } from '@playwright/test'

export class DeliveryDetails {
  constructor(page) {
    this.page = page
    this.firstName = this.page.locator('input[placeholder="First name"]')
    this.lastName = this.page.locator('input[placeholder="Last name"]')
    this.street = this.page.locator('input[placeholder="Street"]')
    this.postCode = this.page.locator('input[placeholder="Post code"]')
    this.city = this.page.locator('input[placeholder="City"]')
    this.country = this.page.locator('select[data-qa="country-dropdown"]')
    this.saveAddressButton = this.page.locator(
      'button[data-qa="save-address-button"]'
    )
    this.continueToPaymentButton = this.page.locator(
      'button[data-qa="continue-to-payment-button"]'
    )

    this.savedAddressContainer = this.page.locator(
      '[data-qa="saved-address-container"]'
    )

    this.savedFirstName = this.page.locator(
      '[data-qa="saved-address-firstName"]'
    )
    this.savedLastName = this.page.locator('[data-qa="saved-address-lastName"]')
    this.savedStreet = this.page.locator('[data-qa="saved-address-street"]')
    this.savedPostCode = this.page.locator('[data-qa="saved-address-postcode"]')
    this.savedCity = this.page.locator('[data-qa="saved-address-city"]')
    this.savedCountry = this.page.locator('[data-qa="saved-address-country"]')
  }

  fillDeliveryDetails = async (userAddress) => {
    await this.saveAddressButton.waitFor()
    await this.continueToPaymentButton.waitFor()

    // Fill out details
    await this.firstName.fill(userAddress.firstName)
    await this.lastName.fill(userAddress.lastName)
    await this.street.fill(userAddress.street)
    await this.postCode.fill(userAddress.postCode)
    await this.city.fill(userAddress.city)
    await this.country.selectOption(userAddress.country)
  }

  async saveDetails() {
    // Count # of saved Address
    const addressCountBeforeSaving = await this.savedAddressContainer.count()

    await this.saveAddressButton.waitFor()
    await this.saveAddressButton.click()
    await this.savedAddressContainer.waitFor()

    await expect(await this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    )

    expect(await this.savedFirstName.first().innerText()).toBe(
      await this.firstName.inputValue()
    )
    expect(await this.savedLastName.first().innerText()).toBe(
      await this.lastName.inputValue()
    )
    expect(await this.savedPostCode.first().innerText()).toBe(
      await this.postCode.inputValue()
    )
    expect(await this.savedCity.first().innerText()).toBe(
      await this.city.inputValue()
    )
    expect(await this.savedCountry.first().innerText()).toBe(
      await this.country.inputValue()
    )
  }

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor()
    await this.continueToPaymentButton.click()
    await this.page.waitForURL(/\/payment/)
  }
}
