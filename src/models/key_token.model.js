import { Schema, model } from "mongoose";

const DOCUMENT_NAME = 'Keys';
const COLLECITON_NAME = 'Keys';

const keyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  privateKey: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: Array,
    default: []
  },
}, {
  collection: COLLECITON_NAME,
  timestamps: true
});

export default model(DOCUMENT_NAME, keyTokenSchema);
