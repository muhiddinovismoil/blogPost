import { HttpException } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(
    message: string,
    statusCode: number,
    options: { cause: Error; description: string },
  ) {
    super(message, statusCode);
  }
}
