import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dtos';
import { SkipAuth } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @SkipAuth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
