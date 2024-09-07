import { BadRequestError } from "../../../core/error.response.js";
import { electronic } from '../../../models/product.model.js';
import { updateProductById } from "../../../models/repositories/product.repo.js";
import { removeUndefinedObject, updateNestedObject } from "../../../utils/index.js";
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

  async updateProduct(productId) {
    const objParams = removeUndefinedObject(this);

    if (objParams.product_attributes) {
      await updateProductById({
        model: electronic,
        bodyUpdate: updateNestedObject(objParams.product_attributes),
        productId
      });

    }

    const updateProduct = await super.updateProduct(productId, updateNestedObject(objParams));
    return updateProduct;
  }
}

