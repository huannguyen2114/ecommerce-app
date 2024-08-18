import { Router } from "express";
import accessRoute from './access/index.js';
import { apiKey, permission } from "../auth/check_auth.js";
const router = Router();

// check Apikey
router.use(apiKey);

// check permission
router.use(permission('0000'));

// TODO: signup api
router.use('/v1/api', accessRoute);

export default router;
