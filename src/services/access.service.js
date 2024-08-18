import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { createTokenPair } from '../auth/auth_utils.js';
import shopModel from '../models/shop.model.js';
import KeyTokenService from './key_token.service.js';
import { getInfoData } from '../utils/index.js';

const Roles = {
  SHOP: '001',
  WRITER: '010',
  EDITOR: '011',
  ADMIN: '111'
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
      const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [Roles.SHOP] });
      if (newShop) {
        // WARN: The commented code below show the how to generate key pair, but it may be overkill at the time I learn this. 
        // const {
        //   publicKey,
        //   privateKey,
        // } = generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        // });

        // Instead, generate simply by random values and add private key to the key schema
        const privateKey = randomBytes(64).toString('hex');
        const publicKey = randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        });

        if (!keyStore) {
          return {
            code: '2001',
            message: 'An error occured!'
          }
        }

        const tokens = await createTokenPair({ email, userId: newShop._id }, publicKey, privateKey);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
            tokens
          }
        }
      }

      return {
        code: null
      }
    } catch (error) {
      return {
        code: '2002',
        message: `An error occured!, ${error}`
      }
    }
  }
}

export default AccessService;


