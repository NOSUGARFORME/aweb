import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { ALREADY_REGISTERED_ERROR } from './user.constants';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользоваьеля' })
  @ApiResponse({ status: 200, type: User })
  @Post('register')
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.userService.findUser(userDto.email);
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.userService.createUser(userDto);
  }

  @ApiResponse({ status: 200, type: [User] })
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: LoginUserDto) {
    const { email } = await this.userService.validateUser(login, password);
    return this.userService.login(email);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }
}
