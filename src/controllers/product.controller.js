import ProductFactory from "../services/product/product.service.js";
import { SuccessResponse } from "../core/success.response.js";

class ProductController {

  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Created successfully!',
      metadata: await ProductFactory.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  publishProductById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Publish successfully!',
      metadata: await ProductFactory.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  unPublishProductById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Publish successfully!',
      metadata: await ProductFactory.unPublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  // update //
  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update product successfully!',
      metadata: await ProductFactory.updateProduct(req.body.product_type, req.params.productId, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }
  // query //
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get successfully!',
      metadata: await ProductFactory.findAllDraftsForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }

  getAllPublishForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get successfully!',
      metadata: await ProductFactory.findAllPublishForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }

  getProductList = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get product list successfully!',
      metadata: await ProductFactory.searchProductsForUser(req.params)
    }).send(res)
  }

  findAllProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get product list successfully!',
      metadata: await ProductFactory.findAllProduct(req.params)
    }).send(res)
  }

  findProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get product successfully!',
      metadata: await ProductFactory.findProduct({
        product_id: req.params.product_id
      })
    }).send(res)
  }
}

const prouductController = new ProductController();
export default prouductController;
