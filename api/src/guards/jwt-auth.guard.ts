import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { USER_IS_NOT_AUTHORIZED_ERROR } from './guard.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.cookies['jwt'];

      if (!token) {
        throw new UnauthorizedException(USER_IS_NOT_AUTHORIZED_ERROR);
      }

      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException(USER_IS_NOT_AUTHORIZED_ERROR);
    }
  }
}
