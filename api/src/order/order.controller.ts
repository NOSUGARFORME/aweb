import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 201, type: Order })
  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return await this.orderService.create(dto);
  }

  @ApiOperation({ summary: 'Получение заказа' })
  @ApiResponse({ status: 200, type: Order })
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'Получение заказа' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUser(@Req() req: Request) {
    return await this.authService
      .verifyUser(req.cookies['jwt'])
      .then(async (user) => await this.orderService.findByUser(user.id));
  }

  @ApiOperation({ summary: 'Изменение заказа' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return await this.orderService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.orderService.delete(id);
  }
}
