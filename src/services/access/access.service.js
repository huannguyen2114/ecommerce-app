import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { createTokenPair } from '../../auth/auth_utils.js';
import { AuthFailureError, BadRequestError, ForbiddenError } from '../../core/error.response.js';
import shopModel from '../../models/shop.model.js';
import { getInfoData } from '../../utils/index.js';
import KeyTokenService from '../key_token/key_token.service.js';
import { findByEmail } from '../shop/shop.service.js';

const Roles = {
  SHOP: '001',
  WRITER: '010',
  EDITOR: '011',
  ADMIN: '111'
};

const SALT = 10;

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError('Shop not registered!');
    }
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError('Authentication error!');

    const privateKey = randomBytes(64).toString('hex');
    const publicKey = randomBytes(64).toString('hex');

    const tokens = await createTokenPair({ email, userId: foundShop._id }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      userId: foundShop._id,
      privateKey,
      publicKey
    })
    return {
      shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
      tokens
    }
  }

  static signUp = async ({ name, email, password }) => {

    const shopHolder = await shopModel.findOne({ email }).lean();
    if (shopHolder) {
      throw new BadRequestError('Error: Email already existed!');
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
        throw BadRequestError('Error while create token');
      }

      const tokens = await createTokenPair({ email, userId: newShop._id }, publicKey, privateKey);

      return {
        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
        tokens
      }
    }
  }

  static logout = async ({ keyStore }) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  }

  static handleRefreshToken = async ({ keyStore, refreshToken, user }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokenUsed.include(refreshToken)) {
      await KeyTokenService.removeKeyById(userId);
      throw new ForbiddenError('Something wrong happened :( !! Please login again');
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError('Shop not registered!');
    }

    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new AuthFailureError('Shop not registered!');
    }


    const tokens = createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey);

    await keyStore.update({
      $set: {
        refreshToken: tokens.refreshToken
      },
      $addToSet: {
        refreshTokenUsed: refreshToken
      }
    })

    return {
      user,
      tokens
    }
  }
}

export default AccessService;


