import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
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
  productId: number;

  @ApiProperty({
    example: '3',
    description: 'Вторичный ключ к таблице пользователей',
  })
  @IsNumber({}, { message: 'ID должен быть числом' })
  userId: number;

  @ApiProperty({
    example: '3',
    description: 'Вторичный ключ к таблице купонов',
  })
  @IsNumber({}, { message: 'ID должен быть числом' })
  @IsOptional()
  couponId?: number;
}
