class MyAccountPage {
  constructor(page) {
    this.page = page
    this.myAccountHeader = page.getByRole('heading', { name: 'My Account' })
  }

  visit = async () => {
    await this.page.goto('/my-account')
  }

  async waitForPageHeading() {
    await this.myAccountHeader.waitFor()
  }
}

export { MyAccountPage }
