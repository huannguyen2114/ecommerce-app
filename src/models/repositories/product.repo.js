import { Types } from "mongoose";
import { product, electronic, clothing } from "../product.model.js";
import { getSelectData, getUnselectData } from "../../utils/index.js";

const queryProduct = async ({ query, limit, skip }) => {
  return await product.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

// WARN : This method for user only
const searchProductForUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const result = await product.find({
    isPublished: true,
    $text: { $search: regexSearch }
  },
    { score: { $meta: 'textScore' } }
  )
    .sort(
      { score: { $meta: 'textScore' } }
    )
    .lean();

  return result;
}

const publishProductByShop = async ({ product_shop, product_id }) => {

  const { modifiedCount } = await product.updateOne(
    {
      product_shop: new Types.ObjectId(product_shop),
      _id: new Types.ObjectId(product_id),
    },
    {
      $set: {
        isDraft: false,
        isPublished: true,
      },
    }
  );

  return modifiedCount;
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {

  const { modifiedCount } = await product.updateOne(
    {
      product_shop: new Types.ObjectId(product_shop),
      _id: new Types.ObjectId(product_id),
    },
    {
      $set: {
        isDraft: true,
        isPublished: false,
      },
    }
  );

  return modifiedCount;
}

const findAllProduct = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort == 'ctime' ? { _id: -1 } : { id: 1 };
  const products = await product.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();

  return products;
}

const findProduct = async ({ product_id, unSelect }) => {
  return await product.findById(product_id).select(getUnselectData(unSelect)).lean();
}

const updateProductById = async ({ productId, bodyUpdate, model, isNew = true }) => {
  return await model.findByIdAndUpdate(productId, bodyUpdate, {
    new: isNew
  });
}
export {
  queryProduct,
  publishProductByShop,
  unPublishProductByShop,
  searchProductForUser,
  findAllProduct,
  findProduct,
  updateProductById
};
