import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from '../common/common.module';
import { Product } from './product.model';
import { ProductAdvantage } from '../advantage/products-advantage.model';
import { Advantage } from '../advantage/advantage.model';
import { ProductController } from './product.controller';
import { AdvantageModule } from '../advantage/advantage.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product, ProductAdvantage, Advantage]),
    CommonModule,
    AdvantageModule,
  ],
})
export class ProductModule {}
