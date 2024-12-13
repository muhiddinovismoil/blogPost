import { IsString, IsUUID } from 'class-validator';

export class CreateCatDto {
  @IsUUID()
  user_id: string;
  @IsString()
  content: number;
  @IsUUID()
  post_id: string;
}
