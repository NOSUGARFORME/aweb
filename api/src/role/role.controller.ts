import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return await this.roleService.update(id, dto);
  }

  @Get('/:id')
  async getByValue(@Param('id') id: number) {
    return await this.roleService.findOne(id);
  }

  @Get()
  async get() {
    return await this.roleService.getAll();
  }
}
