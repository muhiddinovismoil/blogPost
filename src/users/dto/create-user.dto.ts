import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
export class LoginDto {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
export class updatePasswordDto {
  @IsStrongPassword()
  oldPassword: string;
  @IsStrongPassword()
  password: string;
}
