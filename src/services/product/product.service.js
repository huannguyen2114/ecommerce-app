import { BadRequestError } from '../../core/error.response.js';
import prod from './product.config.js';

// define Factory 
class ProductFactory {
  static productRegistry = {}

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid type ${type}`);
    }

    return new productClass(payload).createProduct();
  }
}
// Register each product type in the factory
Object.entries(prod).forEach(([type, classRef]) => {
  ProductFactory.registerProductType(type, classRef);
});

export default ProductFactory;
