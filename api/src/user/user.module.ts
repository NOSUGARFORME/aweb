import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
