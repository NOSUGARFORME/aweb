import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: '342', description: 'Стоимость заказа' })
  @IsNumber({}, { message: 'Стоимость услуги должна быть числом' })
  @Min(0.1, { message: 'Минимальная стоимость услуги 0.1' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Адрес', description: 'Коментарий' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '3', description: 'Вторичный ключ к таблице услуг' })
  @IsNumber({}, { message: 'ID должен быть числом' })
  @IsOptional()
  productId?: number;
}
