import { Router } from "express";
import accessController from "../../controllers/access.controller.js";
import asyncHandler from "../../helpers/async_handlers.js";
import { authentication, authenticationV2 } from "../../auth/auth_utils.js";

const router = Router();

router.post('/login', asyncHandler(accessController.login));
router.post('/signup', asyncHandler(accessController.signUp));

router.use(authenticationV2);
router.post('/logout', asyncHandler(accessController.logout));
router.post('/handlerRefreshToken', asyncHandler(accessController.handleRefreshToken));

export default router;
