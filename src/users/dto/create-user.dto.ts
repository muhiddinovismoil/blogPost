import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  @IsEnum(Role)
  @IsOptional()
  role: Role;
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
