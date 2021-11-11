import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Название', description: 'Название услуги' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '123', description: 'Цена услуги' })
  @IsNumber({}, { message: 'Стоимость услуги должна быть числом' })
  @Min(0.1, { message: 'Минимальная стоимость услуги 0.1' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Крутой', description: 'Описание продукта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'imagePath', description: 'Картинка' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: '["быстрый", "крутой", "лучший"]',
    type: [Number],
    description: 'Приемущества',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  advantages?: string[];
}
