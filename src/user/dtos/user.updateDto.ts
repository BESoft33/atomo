import { IsEmail, IsEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDto{
    @IsOptional()
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsString()
    firstname: string;
  
    @IsOptional()
    @IsString()
    lastname: string;
}