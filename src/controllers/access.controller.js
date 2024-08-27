import { CreatedResponse, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get token successfully!',
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
    }).send(res);
  }

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res);
  }

  signUp = async (req, res, next) => {
    const tokens = await AccessService.signUp(req.body);
    new CreatedResponse({
      message: 'Registered successfully!',
      metadata: tokens
    }).send(res);
  }

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout successfully!',
      metadata: await AccessService.logout({ keyStore: req.keyStore })
    }).send(res);
  }

}

const accessController = new AccessController();
export default accessController;
