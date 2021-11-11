import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => OrderModule),
    CommonModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
