import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Авторизация')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(userDto);
    await response.cookie('jwt', jwt, { httpOnly: true });
    return jwt;
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Req() req: Request) {
    return await this.authService.verifyUser(req.cookies['jwt']);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await response.clearCookie('jwt');
  }
}
