import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, RegisterDto } from './dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('username and password mismatch.');
    }
    const auth = await argon.verify(user.password, dto.password);
    if (!auth) {
      throw new ForbiddenException('username and password mismatch.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...payload } = user;
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signup(dto: RegisterDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          firstName: dto.firstname,
          lastname: dto.lastname,
          password: hash,
        },
      });
      delete user.password;
      return {
        user: user,
        message: 'User created successfully!',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Username or Email already taken.');
        }
      }
      throw error;
    }
  }
}
