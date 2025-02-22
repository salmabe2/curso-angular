import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  // Validaciones
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(6)
  password: string;

  roles: string[];
}
