import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({
      where: { value },
      raw: true,
      nest: true,
    });
  }

  async getRole(id: number) {
    return await this.roleRepository.findByPk(id, { include: { all: true } });
  }

  async getAll() {
    return await this.roleRepository.findAll();
  }

  async getRoleForReg(roleId) {
    if (roleId) {
      console.log(roleId);

      return await this.roleRepository.findByPk(roleId);
    }
    return await this.getRoleByValue('ADMIN');
  }
}
