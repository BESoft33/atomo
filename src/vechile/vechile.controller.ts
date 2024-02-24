import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Patch,
  Body,
  Delete,
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
  findOne(@Param() params) {
    return this.vechileService.findOne(params);
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
  update(@Body() dto: UpdateVechileDto, @Param() params) {
    return this.vechileService.updateVehicle(dto, parseInt(params.id));
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Delete(':id')
  delete(@Param() param) {
    return this.vechileService.deleteVechile(parseInt(param.id));
  }

  @Roles(Role.Moderator)
  @UseGuards(RoleGuard)
  @Patch(':id/assign-driver')
  assignDriver(@Body() dto: AssignDriverDto, @Param() param) {
    return this.vechileService.assignDriver(dto, param);
  }
}
