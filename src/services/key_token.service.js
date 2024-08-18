import keyTokenModel from "../models/key_token.model.js"

class KeyTokenService {
  static createKeyToken = async ({ publicKey, privateKey, userId }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }
}

export default KeyTokenService;
