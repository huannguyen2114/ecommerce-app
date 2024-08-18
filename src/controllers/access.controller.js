import AccessService from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log('[P]::signUp::', req.body);

      const tokens = await AccessService.signUp(req.body);
      return res.status(200).json(tokens);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

const accessController = new AccessController();
export default accessController;
