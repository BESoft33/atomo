import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVechileDto, AssignDriverDto, UpdateVechileDto } from './dtos';

@Injectable()
export class VechileService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    try {
      return await this.prismaService.vechile.findMany();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findOne(params) {
    try {
      return await this.prismaService.vechile.findUnique({
        where: {
          id: parseInt(params.id),
        },
      });
    } catch (UnauthorizedException) {
      throw new UnauthorizedException();
    }
  }

  async createVechile(dto: CreateVechileDto) {
    console.log(dto);
    try {
      return await this.prismaService.vechile.create({
        data: {
          model: dto.model,
          buildYear: dto.buildYear,
          buyYear: dto.buyYear,
          registrationNumber: dto.registrationNumber,
          currentStatus: dto.currentStatus,
          location: dto.location,
          driverId: dto.driverId,
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  async updateVehicle(dto: UpdateVechileDto, id: number) {
    try {
      return await this.prismaService.vechile.update({
        data: {
          currentStatus: dto.currentStatus,
          location: dto.location,
          driverId: dto.driverId,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteVechile(id) {
    try {
      return await this.prismaService.vechile.delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async assignDriver(dto: AssignDriverDto, param) {
    try {
      return await this.prismaService.vechile.update({
        where: {
          id: parseInt(param.id),
        },
        data: {
          driverId: dto.driverId,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
