import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon) private readonly couponRepository: typeof Coupon,
  ) {}

  async create(dto: CreateCouponDto) {
    return await this.couponRepository.create(dto);
  }

  async findOne(id: number) {
    return this.couponRepository.findByPk(id);
  }

  async useCoupon(id: number) {
    const data = await this.findOne(id);
    data.numberOfUsages--;
    return this.couponRepository.update(data, { where: { id } });
  }

  async delete(id: number) {
    return this.couponRepository.destroy({ where: { id } });
  }
}