import mongoose from "mongoose";
import config from '../config/config.mongodb.js';
import { countConnect } from "../helpers/check.connect.js";

const { db: { host, name, port } } = config;
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect(connectString)
      .then((_) => console.log("Connect MongoDb Successfully", countConnect))
      .catch((err) => console.log("Error occured!", err));

    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const mongodbInstance = Database.getInstance();

export default mongodbInstance;
