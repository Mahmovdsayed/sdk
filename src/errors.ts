export class HirelyError extends Error {
  
  readonly status: number;
  
  readonly code: string;
  
  readonly requestId?: string;

  constructor(message: string, status: number, code = "HIRELY_ERROR", requestId?: string) {
    super(message);
    this.name = "HirelyError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
    
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class HirelyAuthenticationError extends HirelyError {
  constructor(message = "Invalid or missing API key", status = 401, requestId?: string) {
    super(message, status, "AUTHENTICATION_ERROR", requestId);
    this.name = "HirelyAuthenticationError";
  }
}

export class HirelyNotFoundError extends HirelyError {
  constructor(message = "Resource not found", requestId?: string) {
    super(message, 404, "NOT_FOUND", requestId);
    this.name = "HirelyNotFoundError";
  }
}

export class HirelyValidationError extends HirelyError {
  constructor(message = "Validation error", status = 422, requestId?: string) {
    super(message, status, "VALIDATION_ERROR", requestId);
    this.name = "HirelyValidationError";
  }
}

export class HirelyRateLimitError extends HirelyError {
  
  readonly retryAfter?: number;

  constructor(message = "Rate limit exceeded", retryAfter?: number, requestId?: string) {
    super(message, 429, "RATE_LIMIT_EXCEEDED", requestId);
    this.name = "HirelyRateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class HirelyTimeoutError extends HirelyError {
  constructor(message = "Request timed out") {
    super(message, 0, "TIMEOUT");
    this.name = "HirelyTimeoutError";
  }
}

export class HirelyServerError extends HirelyError {
  constructor(message = "Internal server error", status = 500, requestId?: string) {
    super(message, status, "SERVER_ERROR", requestId);
    this.name = "HirelyServerError";
  }
}
