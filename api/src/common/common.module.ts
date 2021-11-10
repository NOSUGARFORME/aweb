import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';
import { AbstractService } from './abstract/abstract.service';
import { AbstractService } from './abstract.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
    }),
  ],
  exports: [JwtModule],
  providers: [AbstractService],
})
export class CommonModule {}
