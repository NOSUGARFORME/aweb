import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AdvantageModule } from './advantage/advantage.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { ConfigModule } from '@nestjs/config';
import { Coupon } from './coupon/coupon.model';
import { CommonModule } from './common/common.module';
import { Product } from './product/product.model';
import { ProductAdvantage } from './advantage/products-advantage.model';
import { Advantage } from './advantage/advantage.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Coupon, Product, ProductAdvantage, Advantage],
      autoLoadModels: true,
    }),
    UserModule,
    AdvantageModule,
    CouponModule,
    OrderModule,
    ProductModule,
    RoleModule,
    CommonModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
