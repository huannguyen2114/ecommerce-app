import bcrypt from 'bcrypt';
import shopModel from '../models/shop.model.js';
import crypto from 'crypto';

const Roles = {
  SHOP: '001',
  WRITER: '010',
};

const SALT = 10;

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {

      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: 'xxx',
          message: 'Account already exist!',
        }
      }

      const passwordHash = await bcrypt.hash(password, SALT);
      const newShop = await shopModel.create({ name, email, password, roles: [Roles.SHOP] });

      if (newShop) {
        const { privateKey, publicKey } = await crypto.generateKeyPair('rsa', {
          modulusLength: 4096
        });

        console.log({ privateKey, publicKey });
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: 'An error occured!'
      }
    }
  }
}

export default AccessService;


