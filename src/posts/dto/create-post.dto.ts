import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: number;
  @IsString()
  content: string;
  @IsString()
  slug: string;
}
