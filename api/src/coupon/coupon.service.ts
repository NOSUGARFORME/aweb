import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findOne(id: number): Promise<Coupon> {
    return await this.couponRepository.findByPk(id).then((coupon) => {
      if (!coupon) {
        throw new NotFoundException('Такого купона нет');
      }
      return coupon;
    });
  }

  async useCoupon(id: number) {
    return await this.findOne(id).then(async (coupon) => {
      if (coupon.numberOfUsages < 0) {
        throw new BadRequestException('Неизвестный купон');
      }
      coupon.numberOfUsages--;
      await this.couponRepository.update(coupon, { where: { id } });
    });
  }

  async delete(id: number) {
    return this.couponRepository.destroy({ where: { id } });
  }
}
