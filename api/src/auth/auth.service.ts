import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  ALREADY_REGISTERED_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    console.log();
    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findUser(userDto.email);
    if (candidate) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(userDto.password, salt);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return await this.generateToken(user);
  }

  async verifyUser(token: string): Promise<User> {
    const user = await this.jwtService.verifyAsync(token);
    return await this.userService.findOne(user.id);
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.findUser(userDto.login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const passwordEquals = await compare(userDto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return user;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.role };
    return await this.jwtService.signAsync(payload).then((token) => token);
  }
}
