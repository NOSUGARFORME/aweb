import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { USER_OR_ROLE_NOT_FOUND_ERROR } from './user.constants';
import { JwtService } from '@nestjs/jwt';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../role/role.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('role', [role.id]);
    user.role = role;
    return user;
  }

  async findUser(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      include: Role,
    });
  }

  async findOne(condition) {
    return this.userRepository.findOne(condition);
  }

  async updateUser(id: number, data) {
    return this.userRepository.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return this.userRepository.destroy({ where: { id } });
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
