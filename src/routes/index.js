import { Router } from "express";
import accessRoute from './access/index.js';
const router = Router();

// TODO: signup api
router.use('/v1/api', accessRoute);
// router.get("", (req, res) =>
//   res.status(200).json({
//     message: "welcome",
//   }),
// );

export default router;
