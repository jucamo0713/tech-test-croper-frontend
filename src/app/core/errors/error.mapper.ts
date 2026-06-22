import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app-error';
import { HttpErrorResponseDto } from './http-error-response.dto';

export class ErrorMapper {
  static fromUnknown(error: unknown): AppError {
    if (error instanceof HttpErrorResponse) {
      return this.fromHttpError(error);
    }

    if (this.isAppError(error)) {
      return error;
    }

    if (error instanceof Error) {
      return {
        kind: 'unknown',
        message: error.message,
        details: error,
      };
    }

    return {
      kind: 'unknown',
      message: 'Unexpected error',
      details: error,
    };
  }

  private static fromHttpError(error: HttpErrorResponse): AppError {
    const payload = this.asHttpErrorPayload(error.error);
    const message = payload?.message ?? error.message;

    return {
      kind: error.status === 0 ? 'network' : 'http',
      message: Array.isArray(message) ? message.join(', ') : message,
      statusCode: payload?.httpStatusCode ?? error.status,
      requestId: payload?.requestId ?? error.headers.get('x-request-id') ?? undefined,
      path: payload?.path ?? error.url ?? undefined,
      details: error.error,
    };
  }

  private static asHttpErrorPayload(value: unknown): HttpErrorResponseDto | undefined {
    if (value && typeof value === 'object') {
      return value as HttpErrorResponseDto;
    }

    return undefined;
  }

  private static isAppError(value: unknown): value is AppError {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const candidate = value as Partial<AppError>;
    return typeof candidate.kind === 'string' && typeof candidate.message === 'string';
  }
}
