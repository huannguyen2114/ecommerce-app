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

// handling error
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

router.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error'
  })
})

export default router;
