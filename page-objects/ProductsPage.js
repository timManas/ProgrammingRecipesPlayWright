export class ProductsPage {
  // This is constructor method
  constructor(page) {
    this.page = page
  }

  // This is visit function
  visit = async () => {
    await this.page.goto('/')
  }
}
