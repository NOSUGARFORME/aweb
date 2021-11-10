import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../guards/roles-guard.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Coupon } from './coupon.model';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { CouponService } from './coupon.service';

@ApiTags('Купоны')
@Controller('coupon')
@Roles('ADMIN')
@UseGuards(RolesGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiOperation({ summary: 'Создание купона' })
  @ApiResponse({ status: 201, type: Coupon })
  @Post()
  async create(@Body() couponDto: CreateCouponDto) {
    return await this.couponService.create(couponDto);
  }

  @ApiOperation({ summary: 'Получение купона' })
  @ApiResponse({ status: 200, type: Coupon })
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.couponService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.couponService.delete(id);
  }

  @Get()
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('coupon') coupon: string,
  ) {}
}
