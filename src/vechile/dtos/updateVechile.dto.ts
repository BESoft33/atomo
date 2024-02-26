import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../enums/vechile.status';

export class UpdateVechileDto {
  @IsEnum(Status)
  @IsOptional()
  currentStatus: Status;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  driverId: number;
}
