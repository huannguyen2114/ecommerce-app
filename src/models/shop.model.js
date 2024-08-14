import { Collection, model, Schema, Types } from "mongoose";

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new Schema({
  name: {
    Type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  },
  timestalmps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, shopSchema);
