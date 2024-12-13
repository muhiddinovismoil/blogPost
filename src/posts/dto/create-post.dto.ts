import { IsString, IsUUID } from 'class-validator';

export class CreateCatDto {
  @IsUUID()
  user_id: string;
  @IsString()
  title: number;
  @IsString()
  content: string;
  @IsString()
  slug: string;
}
