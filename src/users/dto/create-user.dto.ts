import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateCatDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: number;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
