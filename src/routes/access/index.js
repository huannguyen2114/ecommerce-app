import { Router } from "express";
import accessController from "../../controllers/access.controller.js";
import asyncHandler from "../../helpers/async_handlers.js";
import { authentication } from "../../auth/auth_utils.js";

const router = Router();

router.post('/shop/login', asyncHandler(accessController.login));
router.post('/shop/signup', asyncHandler(accessController.signUp));

router.use(authentication);
router.post('/shop/logout', asyncHandler(accessController.logout));
router.post('/shop/hehe', asyncHandler(accessController.handleRefreshToken));

export default router;
