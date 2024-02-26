import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateDto, UpdateRoleDto } from "./dtos";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }

  getProfile(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async getUserById(id: number) {
    try {
      return await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });
    } catch {
      throw new NotFoundException('not found');
    }
  }

  async updateUser(dto: UpdateDto, id: number) {
    try {
      return await this.prismaService.user.update({
        data: {
          email: dto.email,
          firstName: dto.firstname,
          lastname: dto.lastname,
        },
        where: {
          id: id,
        },
      });
    } catch {
      throw new UnauthorizedException();
    }
  }


  async updateUserRole(id:number, dto: UpdateRoleDto) {
    try {
      return await this.prismaService.user.update({
        data: {
          role: dto.role,
        },
        where: {
          id: id,
        },
      });
    } catch(error) {
      console.log(error.message);
      throw new UnauthorizedException('unauthorized request');
    }
  }
}