import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Role } from '../user/enum/role.enum';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { Roles } from 'src/user/role.decorator';
import { VechileService } from './vechile.service';
import { UpdateVechileDto, CreateVechileDto, AssignDriverDto } from './dtos';

@UseGuards(JwtGuard)
@Controller('vechile')
export class VechileController {
  constructor(private vechileService: VechileService) {}

  @Get()
  getAll() {
    return this.vechileService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.vechileService.findOne(id);
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Post('new')
  create(@Body() dto: CreateVechileDto) {
    return this.vechileService.createVechile(dto);
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Patch(':id')
  update(@Body() dto: UpdateVechileDto, @Param('id', ParseIntPipe) id:number) {
    return this.vechileService.updateVehicle(dto, id);
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vechileService.deleteVechile(id);
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Patch(':id/assign-driver')
  assignDriver(@Body() dto: AssignDriverDto, @Param('id', ParseIntPipe) id) {
    return this.vechileService.assignDriver(dto, id);
  }
}
