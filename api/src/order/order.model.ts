import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product/product.model';
import { Coupon } from '../coupon/coupon.model';

export class OrderCreationAttrs {
  description?: string;
  productId: number;
  userId: number;
  couponId?: number;
  price: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '342', description: 'Стоимость заказа' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 'Адрес', description: 'Коментарий' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ApiProperty({ example: '3', description: 'Вторичный ключ к таблице услуг' })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @ApiProperty({
    example: '3',
    description: 'Вторичный ключ к таблице пользователей',
  })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    example: '3',
    description: 'Вторичный ключ к таблице купонов',
  })
  @ForeignKey(() => Coupon)
  @Column({ type: DataType.INTEGER, allowNull: true })
  couponId: number;
}
