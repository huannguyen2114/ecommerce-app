import { Types } from "mongoose";
import keyTokenModel from "../../models/key_token.model.js"

const { ObjectId } = Types;
class KeyTokenService {
  static createKeyToken = async ({ publicKey, privateKey, userId, refreshToken }) => {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // });
      //
      // return tokens ? tokens.publicKey : null;


      // New way to do

      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
        options = { upsert: true, new: true };

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }

  static findByUserId = async ({ userId }) => {
    return await keyTokenModel.findOne({ user: new ObjectId(userId) }).lean();
  }

  static removeKeyById = async ({ id }) => {
    return await keyTokenModel.deleteOne({
      _id: new ObjectId(id)
    });
  }

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokenUsed: refreshToken }).lean();
  }

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken: refreshToken });
  }
}

export default KeyTokenService;
