import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from '../enums/vechile.status';

export class UpdateVechileDto {
  @IsEnum(Status)
  @IsNotEmpty()
  currentStatus: Status;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  driverId: number;
}
