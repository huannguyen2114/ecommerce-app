import { model, Schema, SchemaTypes } from "mongoose";
import slugify from "slugify";

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
  },
  prouduct_slug: String,
  product_ratings: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be above 5.0'],
    set: (val) => Math.round(val * 10) / 10
  },
  product_variations: {
    type: Array,
    default: []
  },
  isDraft: {
    type: Boolean,
    default: true,
    index: true,
    select: false
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true,
    select: false
  },
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});

// Document middleware: run before .save() and .create()...
productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
})

// Create index
productSchema.index({ product_name: 'text', product_description: 'text' });

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
