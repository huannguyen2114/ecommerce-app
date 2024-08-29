import { Router } from "express";
import accessRoute from './access/index.js';
import productRoute from './product/index.js'
import { apiKey, permission } from "../auth/check_auth.js";
const router = Router();

// check Apikey
router.use(apiKey);

// check permission
router.use(permission('0000'));

// Define util route
router.use('/shop', accessRoute);
router.use('/product', productRoute);


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
    stack: error.stack,
    message: error.message || 'Internal Server Error'
  })
})

export default router;
