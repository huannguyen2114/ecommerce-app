import { BadRequestError } from "../../../core/error.response.js";
import { electronic } from '../../../models/product.model.js';
import Product from "./base.product.js";

// electronic
export default class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop
    });
    if (!newElectronic) {
      throw new BadRequestError('Create new electronic error!');
    }

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) {
      throw new BadRequestError('Create new electronic error!');
    }

    return newProduct;
  }
}

