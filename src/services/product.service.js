import { BadRequestError } from '../core/error.response.js';
import { product, clothing, electronic } from '../models/product.model.js';

// define Factory 
class ProductFactory {
  static async createProduct(type, payload) {
    switch (type) {

      case 'Electronics':
        return new Electronic(payload).createProduct();

      case 'Clothes':
        return new Clothing(payload).createProduct();

      default:
        throw new BadRequestError(`Invalid type ${type}`);
    }
  }
}

// define base product class
class Product {
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
}

// Define subclass for different product types

// clothing
class Clothing extends Product {
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

// electronic
class Electronic extends Product {
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

export default ProductFactory;
