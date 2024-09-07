import { BadRequestError } from "../../../core/error.response.js";
import { clothing } from '../../../models/product.model.js';
import { updateProductById } from "../../../models/repositories/product.repo.js";
import { removeUndefinedObject, updateNestedObject } from "../../../utils/index.js";
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

  async updateProduct(productId) {
    const objParams = removeUndefinedObject(this);

    if (objParams.product_attributes) {
      await updateProductById({
        model: clothing,
        bodyUpdate: updateNestedObject(objParams.product_attributes),
        productId
      });
    }

    const updateProduct = await super.updateProduct(productId, updateNestedObject(objParams));

    return updateProduct;
  }
}
