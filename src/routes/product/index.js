import { Router } from "express";
import asyncHandler from "../../helpers/async_handlers.js";
import { authentication } from "../../auth/auth_utils.js";
import prouductController from "../../controllers/product.controller.js";

const router = Router();


router.get('/search/:keySearch', asyncHandler(prouductController.getProductList));
router.get('', asyncHandler(prouductController.findAllProduct));
router.get('/:product_id', asyncHandler(prouductController.findProduct));

router.use(authentication);

router.post('', asyncHandler(prouductController.createProduct));
router.patch('/:productId', asyncHandler(prouductController.updateProduct));
router.post('/publish/:id', asyncHandler(prouductController.publishProductById));
router.post('/unPublish/:id', asyncHandler(prouductController.unPublishProductById));

// query //
/**
 * @desc Get all product for shop
 * @param  {Number} limit
 * @param  {Number} skip
 * @return {JSON}
 **/
router.get('/drafts/all', asyncHandler(prouductController.getAllDraftForShop));

router.get('/publish/all', asyncHandler(prouductController.getAllPublishForShop));


export default router;
