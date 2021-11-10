import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import {
  DO_NOT_HAVE_ACCESS_ERROR,
  USER_IS_NOT_AUTHORIZED_ERROR,
} from './guard.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './guard.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    try {
      const token = req.cookies['jwt'];

      if (!token) {
        throw new UnauthorizedException(USER_IS_NOT_AUTHORIZED_ERROR);
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      return requiredRoles.includes(user.roles.value);
    } catch (e) {
      throw new ForbiddenException(DO_NOT_HAVE_ACCESS_ERROR);
    }
  }
}
