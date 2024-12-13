import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: number;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
export class LoginDto {
  email: string;
  passwrord: string;
}
export class updatePasswordDto {
  oldPassword: string;
  passwrord: string;
}
