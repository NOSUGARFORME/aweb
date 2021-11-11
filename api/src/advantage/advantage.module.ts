import { Module } from '@nestjs/common';
import { AdvantageService } from './advantage.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Advantage } from './advantage.model';
import { Product } from '../product/product.model';
import { ProductAdvantage } from './products-advantage.model';
import { AdvantageController } from './advantage.controller';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [AdvantageController],
  providers: [AdvantageService],
  imports: [
    SequelizeModule.forFeature([Advantage, Product, ProductAdvantage]),
    CommonModule,
  ],
})
export class AdvantageModule {}
