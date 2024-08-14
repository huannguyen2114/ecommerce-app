class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log('[P]::signUp::', req.body);
      return res.status(200).json({
        code: '20001',
        metadata: { userData: 1 }
      })
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

const accessController = new AccessController();
export default accessController;
