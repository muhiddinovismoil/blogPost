import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(
    message: string,
    options?: { cause?: Error; description?: string },
  ) {
    super(
      {
        message,
        cause: options?.cause?.message,
        description: options?.description,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
