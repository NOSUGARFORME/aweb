import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }

  @Get('/:value')
  async getByValue(@Param() param) {
    return await this.roleService.getRoleByValue(param.value);
  }

  @Get()
  async get() {
    return await this.roleService.getAll();
  }
}
