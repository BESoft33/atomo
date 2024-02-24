import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from './role.decorator';
import { Role } from './enum/role.enum';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private prismaService: PrismaService) {}
  @Get()
  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  @Get('profile')
  getProfile(@Query('username') username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  @Get(':id')
  async getUserById(@Param() params) {
    try {
      return await this.prismaService.user.findFirst({
        where: {
          id: parseInt(params.id),
        },
      });
    } catch {
      throw new NotFoundException('not found');
    }
  }

  @Patch(':id/update')
  async updateUser(@Param() params) {
    try {
      return await this.prismaService.user.update({
        data: {
          email: params.email,
          firstName: params.firstname,
          lastname: params.lastname,
        },
        where: {
          id: parseInt(params.id),
        },
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Patch(':id/role')
  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  async updateUserRole(@Param() params, @Req() req) {
    try {
      return await this.prismaService.user.update({
        data: {
          role: req.body.role,
        },
        where: {
          id: parseInt(params.id),
        },
      });
    } catch {
      throw new UnauthorizedException('unauthorized request');
    }
  }
}
