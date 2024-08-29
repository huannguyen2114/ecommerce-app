import { BadRequestError } from "../../../core/error.response.js";
import { clothing } from '../../../models/product.model.js';
import Product from "./base.product.js";
// clothing
export default class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    });
    if (!newClothing) {
      throw new BadRequestError('Create new clothes error!');
    }

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) {
      throw new BadRequestError('Create new clothes error!');
    }

    return newProduct;
  }
}
