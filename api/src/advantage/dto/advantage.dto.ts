import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdvantageDto {
  @ApiProperty({ example: 'Название', description: 'Название приемущества' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'Крутой', description: 'Описание приемущества' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
