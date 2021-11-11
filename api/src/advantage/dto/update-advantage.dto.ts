import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdvantageDto {
  @ApiProperty({ example: 'Название', description: 'Название приемущества' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Крутой', description: 'Описание приемущества' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly description?: string;
}
