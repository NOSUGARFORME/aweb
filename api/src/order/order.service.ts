import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CouponService } from '../coupon/coupon.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    private readonly couponService: CouponService,
    private readonly productService: ProductService,
  ) {}

  async create(dto: CreateOrderDto) {
    const product = await this.productService.findOne(dto.productId);
    dto.price = product.price;
    if (dto.couponId) {
      await this.couponService.useCoupon(dto.couponId);
      const coupon = await this.couponService.findOne(dto.couponId);
      dto.price -= coupon.discount;
    }

    return await this.orderRepository.create({ ...dto, price: dto.price });
  }

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async findOne(id: number) {
    return await this.orderRepository.findByPk(id).then((order) => {
      if (!order) throw new NotFoundException('Заказ не найден');

      return order;
    });
  }

  async findByUser(userId: number) {
    return await this.orderRepository
      .findAll({ where: { userId } })
      .then((advantage) => {
        if (!advantage) throw new NotFoundException('Заказ не найден');

        return advantage;
      });
  }

  async update(id: number, dto: UpdateOrderDto) {
    return await this.findOne(id).then((order) => order.update(dto));
  }

  async delete(id: number) {
    return await this.orderRepository.destroy({ where: { id } });
  }
}
