import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Advantage } from './advantage.model';
import { Product } from '../product/product.model';

@Table({ tableName: 'advantage_product', createdAt: false, updatedAt: false })
export class ProductAdvantage extends Model<ProductAdvantage> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Advantage)
  @Column({ type: DataType.INTEGER })
  advantageId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
}
