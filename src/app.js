import compression from "compression";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv';
import routes from './routes/index.js';
// init db
import mongodbInstance from "./dbs/init.mongodb.js";
// import { checkOverload } from "./helpers/check.connect.js";

// checkOverload();

dotenv.config();
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
app.use('/v1/api', routes);

export default app;
