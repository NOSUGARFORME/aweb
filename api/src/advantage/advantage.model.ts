import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product/product.model';
import { ProductAdvantage } from './products-advantage.model';

interface AdvantageCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'advantage' })
export class Advantage extends Model<Advantage, AdvantageCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Название', description: 'Название приемущества' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Крутой', description: 'Описание приемущества' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => Product, () => ProductAdvantage)
  products: Product[];
}
