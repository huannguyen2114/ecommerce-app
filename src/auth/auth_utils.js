import JWT from 'jsonwebtoken';
import asyncHandler from '../helpers/async_handlers.js';
import { AuthFailureError, BadRequestError } from '../core/error.response.js';
import KeyTokenService from '../services/key_token.service.js';
import { SuccessResponse } from '../core/success.response.js';

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    });


    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    });

    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.error('error verify::', error);
      } else {
        console.log('decode verify::', decode);
      }
    })

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
}

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError('Invalid client!');
  }

  const keyStore = await KeyTokenService.findByUserId({ userId });
  if (!keyStore) {
    throw new SuccessResponse();
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError('Invalid request!');
  }

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Invalid user!');
    }
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
})

export {
  createTokenPair,
  authentication
};
