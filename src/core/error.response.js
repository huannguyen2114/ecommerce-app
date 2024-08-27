import httpStatusCode from "../lib/http/http_status_code.js";

class ErrorReponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorReponse {
  constructor(message = httpStatusCode.ReasonPhrases.CONFLICT, statusCode = httpStatusCode.StatusCodes.CONFLICT) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorReponse {
  constructor(message = httpStatusCode.ReasonPhrases.BAD_REQUEST, statusCode = httpStatusCode.StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorReponse {
  constructor(message = httpStatusCode.ReasonPhrases.UNAUTHORIZED, statusCode = httpStatusCode.StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorReponse {
  constructor(message = httpStatusCode.ReasonPhrases.FORBIDDEN, statusCode = httpStatusCode.StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

export {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  ForbiddenError
}
