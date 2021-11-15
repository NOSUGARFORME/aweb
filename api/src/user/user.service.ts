import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { USER_OR_ROLE_NOT_FOUND_ERROR } from './user.constants';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../role/role.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleForReg(dto.roleId);
    const user = await this.userRepository.create(dto);
    await user.$set('role', role.id);
    user.role = role;
    return user;
  }

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      include: Role,
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findByPk(id, {
      raw: true,
      nest: true,
      include: Role,
    });
  }

  async updateUser(id: number, data) {
    return await this.userRepository.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await this.userRepository.destroy({ where: { id } });
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

  async getAllUsers() {
    return await this.userRepository.findAll({
      raw: true,
      nest: true,
      include: { all: true },
    });
  }

  async paginate(
    page = 1,
    limit = 10,
    // where: WhereOptions<User> = { where: {} },
    // order: Order = ['id', 'ASC'],
  ): Promise<any> {
    const offset = (page - 1) * limit;
    const res = await this.userRepository.findAndCountAll({
      // where: where,
      // order: order,
      limit: limit,
      offset: offset,
      include: Role,
      raw: true,
      nest: true,
    });

    const total = res.count;

    return {
      data: res.rows.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit),
      },
    };
  }
}
