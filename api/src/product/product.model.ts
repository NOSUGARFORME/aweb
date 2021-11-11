import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProductAdvantage } from '../advantage/products-advantage.model';
import { Advantage } from '../advantage/advantage.model';

interface ProductCreationAttrs {
  name: string;
  price: number;
  description: string;
  image?: string;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Название', description: 'Название услуги' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Цена', description: 'Цена услуги' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 'Крутой', description: 'Описание услуги' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'imagePath', description: 'Картинка' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @BelongsToMany(() => Advantage, () => ProductAdvantage)
  advantages: Advantage[];
}
