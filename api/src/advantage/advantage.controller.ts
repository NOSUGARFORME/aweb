import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../guards/roles-guard.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AdvantageService } from './advantage.service';
import { Advantage } from './advantage.model';
import { AdvantageDto } from './dto/advantage.dto';
import { UpdateAdvantageDto } from './dto/update-advantage.dto';

@ApiTags('Приемущества')
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('advantage')
export class AdvantageController {
  constructor(private readonly advantageService: AdvantageService) {}

  @ApiOperation({ summary: 'Создание приемущества' })
  @ApiResponse({ status: 201, type: Advantage })
  @Post()
  async create(@Body() dto: AdvantageDto) {
    return await this.advantageService.create(dto);
  }

  @ApiOperation({ summary: 'Получение приемущества' })
  @ApiResponse({ status: 200, type: Advantage })
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.advantageService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменение приемущества' })
  @ApiResponse({ status: 200, type: Advantage })
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAdvantageDto) {
    return await this.advantageService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление приемущества' })
  @ApiResponse({ status: 200, type: Advantage })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.advantageService.delete(id);
  }
}
