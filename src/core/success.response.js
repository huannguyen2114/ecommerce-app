import httpStatusCode from "../lib/http/http_status_code.js";

class SuccessResponse {
  constructor({ message, statusCode = httpStatusCode.StatusCodes.OK, reasonPhrases = httpStatusCode.ReasonPhrases.OK, metadata = {} }) {
    this.message = message ?? reasonPhrases;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OkResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message, statusCode = httpStatusCode.StatusCodes.CREATED, reasonPhrases = httpStatusCode.ReasonPhrases.CREATED, metadata }) {
    super({ message, statusCode, reasonPhrases, metadata });
  }
}

export {
  OkResponse,
  CreatedResponse,
  SuccessResponse
}
