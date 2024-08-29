import { Router } from "express";
import asyncHandler from "../../helpers/async_handlers.js";
import { authentication } from "../../auth/auth_utils.js";
import prouductController from "../../controllers/product.controller.js";

const router = Router();

router.use(authentication);
router.post('', asyncHandler(prouductController.createProduct));

export default router;
