import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Advantage } from './advantage.model';
import { AdvantageDto } from './dto/advantage.dto';
import { UpdateAdvantageDto } from './dto/update-advantage.dto';

@Injectable()
export class AdvantageService {
  constructor(
    @InjectModel(Advantage)
    private readonly advantageRepository: typeof Advantage,
  ) {}

  async create(dto: AdvantageDto) {
    return await this.advantageRepository.create(dto);
  }

  async findOne(id: number) {
    return await this.advantageRepository.findByPk(id).then((advantage) => {
      if (!advantage) {
        throw new NotFoundException('Приемущество не найдено');
      }
      return advantage;
    });
  }

  async update(id: number, dto: UpdateAdvantageDto) {
    return await this.findOne(id).then((advantage) => advantage.update(dto));
  }

  async delete(id: number) {
    return this.advantageRepository.destroy({ where: { id } });
  }
}
