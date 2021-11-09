import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { USER_OR_ROLE_NOT_FOUND_ERROR } from './user.constants';
import { JwtService } from '@nestjs/jwt';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roleId', role.id);
    user.role = role;
    return user;
  }

  async findUser(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new NotFoundException(USER_OR_ROLE_NOT_FOUND_ERROR);
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
}
