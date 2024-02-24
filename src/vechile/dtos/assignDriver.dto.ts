import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignDriverDto {
  @IsNotEmpty()
  @IsNumber()
  driverId: number;
}
