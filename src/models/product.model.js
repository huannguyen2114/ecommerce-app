import { model, Schema, SchemaTypes } from "mongoose";

const DOCUMENT_NAME = 'Products';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true
  },
  product_thumb: {
    type: String,
    required: true
  },
  product_description: String,
  product_price: {
    type: Number,
    required: true
  },
  product_quantity: {
    type: Number,
    required: true
  },
  product_type: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothes', 'Furniture']
  },
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  product_attributes: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});



// Define the product Types

// Clothing
const clothingSchema = new Schema({
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  brand: {
    type: String,
    required: true
  },
  size: String,
  material: String
}, {
  collection: 'Clothes',
  timestamps: true
});

// Electronics
const electronicsSchema = new Schema({
  product_shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  manufacturer: {
    type: String,
    required: true
  },
  size: String,
  material: String
}, {
  collection: 'Electronics',
  timestamps: true
});



export const product = model(DOCUMENT_NAME, productSchema);
export const electronic = model('Electronics', electronicsSchema);
export const clothing = model('Clothes', clothingSchema);
