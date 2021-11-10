import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [SequelizeModule.forFeature([Coupon]), CommonModule],
})
export class CouponModule {}
