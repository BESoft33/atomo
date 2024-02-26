import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateDto, UpdateRoleDto } from './dtos';
import { Roles } from './role.decorator';
import { Role } from './enum/role.enum';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('profile')
  getProfile(@Query('username') username: string) {
    console.log(username);
    
    return this.userService.getProfile(username);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateDto) {
    return await this.userService.updateUser(dto, id);
  }

  @Patch(':id/role')
  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  async updateUserRole(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateRoleDto) {
    return await this.userService.updateUserRole(id, dto);
  }

}
