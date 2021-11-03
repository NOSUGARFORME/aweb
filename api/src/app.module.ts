import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { AdvantageController } from './advantage/advantage.controller';
import { CouponController } from './coupon/coupon.controller';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';
import { AdvantageModule } from './advantage/advantage.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

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
      models: [User],
      autoLoadModels: true,
    }),
    UserModule,
    AdvantageModule,
    CouponModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [],
})
export class AppModule {}
