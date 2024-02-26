import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/user/enum/role.enum";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsStrongPassword()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    firstname: string;
  
    @IsString()
    lastname: string;
  
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
  }