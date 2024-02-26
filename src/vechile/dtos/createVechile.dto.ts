import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../enums/vechile.status';

export class CreateVechileDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDateString()
  @IsNotEmpty()
  buildYear: Date;

  @IsDateString()
  @IsNotEmpty()
  buyYear: Date;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsEnum(Status)
  @IsNotEmpty()
  currentStatus: Status;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  driverId: number;
}
