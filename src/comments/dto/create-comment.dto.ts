import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: number;
  @IsString()
  post_id: string;
}
