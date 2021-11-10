import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
    }),
  ],
  exports: [JwtModule],
  providers: [],
})
export class CommonModule {}
