import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CouponCreationAttrs {
  discount: number;
  numberOfUsages: number;
}

@Table({ tableName: 'coupons' })
export class Coupon extends Model<Coupon, CouponCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '342', description: 'Стоимость купона' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  discount: number;

  @ApiProperty({ example: '3', description: 'Количество использований купона' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  numberOfUsages: number;
}
