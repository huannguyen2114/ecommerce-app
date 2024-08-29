import ProductFactory from "../services/product.service.js";
import { SuccessResponse } from "../core/success.response.js";

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Created Successfully',
      metadata: await ProductFactory.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }
}

const prouductController = new ProductController();
export default prouductController;
