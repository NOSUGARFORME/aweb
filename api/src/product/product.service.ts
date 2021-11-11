import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdvantageService } from '../advantage/advantage.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    private readonly advantageService: AdvantageService,
  ) {}

  async create(dto: CreateProductDto) {
    const { advantages, ...data } = dto;
    const product = await this.productRepository.create(data);
    if (advantages) {
      advantages.map(async (adv) => {
        const advantage = await this.advantageService.findByName(adv);
        await product.$set('advantages', [advantage.id]);
        product.advantages.push(advantage);
      });
    }
    return product;
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(id: number) {
    return await this.productRepository
      .findByPk(id, { include: { all: true } })
      .then((product) => {
        if (!product) throw new NotFoundException('Услуга не найдена');

        return product;
      });
  }

  async update(id: number, dto: UpdateProductDto) {
    return await this.findOne(id).then(async (product) => {
      const { advantages, ...data } = dto;
      if (advantages) {
        const advs = [];
        advantages.map(async (adv) => {
          const advantage = await this.advantageService.findByName(adv);
          await product.$set('advantages', [advantage.id]);
          advs.push(advantage);
        });
        product.advantages = advs;
      }
      await product.update(data);
      return await this.findOne(product.id);
    });
  }

  async delete(id: number) {
    return this.productRepository.destroy({ where: { id } });
  }
}
