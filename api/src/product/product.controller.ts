import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Advantage } from '../advantage/advantage.model';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Создание приемущества' })
  @ApiResponse({ status: 201, type: Advantage })
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @ApiOperation({ summary: 'Получение услуги' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменение усуги' })
  @ApiResponse({ status: 200, type: Product })
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление приемущества' })
  @ApiResponse({ status: 200, type: Advantage })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
