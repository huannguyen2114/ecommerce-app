import { BadRequestError } from '../../core/error.response.js';
import { findAllProduct, findProduct, publishProductByShop, queryProduct, searchProductForUser, unPublishProductByShop } from '../../models/repositories/product.repo.js';
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

  // put //
  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id });
  }

  static async updateProduct(type, productId, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid type ${type}`);
    }

    return new productClass(payload).updateProduct(productId);

  }

  // query //

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await queryProduct({ query, limit, skip });
  }

  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await queryProduct({ query, limit, skip });
  }

  static async searchProductsForUser({ keySearch }) {
    return await searchProductForUser({ keySearch });
  }


  static async findAllProduct({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
    return await findAllProduct({ limit, sort, filter, page, select: ['product_name', 'product_price', 'product_thumb'] });
  }


  static async findProduct({ product_id, }) {
    return await findProduct({ product_id, unSelect: ['__v'] });
  }
}
// Register each product type in the factory
Object.entries(prod).forEach(([type, classRef]) => {
  ProductFactory.registerProductType(type, classRef);
});

export default ProductFactory;
