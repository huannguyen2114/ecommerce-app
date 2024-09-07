// define base product class
import { product } from '../../../models/product.model.js';
import { updateProductById } from '../../../models/repositories/product.repo.js';
export default class Product {
  constructor({
    product_name, product_thumb, product_price, product_quantity, product_type, product_description, product_shop, product_attributes
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_description = product_description;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  // create new product
  async createProduct(product_id) {
    return product.create({
      ...this,
      _id: product_id
    });
  }

  // update product
  async updateProduct(productId, bodyUpdate) {
    return await updateProductById({ model: product, productId, bodyUpdate });
  }
}
