class CustomError extends Error {
  status: number;
  statusMessage: string;
  constructor(message: string) {
    super(message);
  }
}

export class ErrorConflict extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusMessage = "ConflictError";
    this.status = 209;
  }
}

export class ErrorBadRequest extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusMessage = "BadRequest";
    this.status = 400;
  }
}

export class ErrorNotFound extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusMessage = "NotFoundError";
    this.status = 404;
  }
}

export class ErrorUnauthorized extends CustomError {
  constructor(message = "Access denied") {
    super(message);
    this.statusMessage = "UnauthorizedError";
    this.status = 401;
  }
}
