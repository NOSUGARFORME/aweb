import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { Coupon } from '../coupon/coupon.model';
import { CommonModule } from '../common/common.module';
import { CouponModule } from '../coupon/coupon.module';
import { ProductModule } from '../product/product.module';
import { User } from '../user/user.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    SequelizeModule.forFeature([Order, Product, Coupon, User]),
    CommonModule,
    CouponModule,
    ProductModule,
    forwardRef(() => AuthModule),
  ],
})
export class OrderModule {}
