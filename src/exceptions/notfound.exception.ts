import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
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
      HttpStatus.NOT_FOUND,
    );
  }
}
