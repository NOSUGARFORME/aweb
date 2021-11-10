import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    example: '123',
    description: 'Стоимость купона',
  })
  @IsNumber({}, { message: 'Стоимость купона должна быть числом' })
  @Min(0.1, { message: 'Минимальная стоимость купона 0.1' })
  readonly discount: number;

  @ApiProperty({
    example: '3',
    description: 'Количество использований купона',
  })
  @IsNumber(
    {},
    { message: 'Количество использований купона должно быть числом' },
  )
  @Min(1, { message: 'Минимальное количество использований купона 1' })
  readonly numberOfUsages: number;
}
