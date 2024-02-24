import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

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
    console.log(username);
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

  @Put(':id')
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
}
