import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from '../guards/roles-guard.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Пользователи')
@UseInterceptors(ClassSerializerInterceptor)
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользоваьеля' })
  @ApiResponse({ status: 200, type: User })
  @Post('register')
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll(@Query() query) {
    let page = Number.parseInt(query.page);
    let limit = Number.parseInt(query.limit);

    if (Number.isNaN(page) || page <= 0) {
      page = 1;
    }

    if (Number.isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    return await this.userService.paginate(page, limit);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
