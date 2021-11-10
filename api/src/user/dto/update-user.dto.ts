import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: 'Петр', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly surname?: string;

  @ApiProperty({ example: '+375111111111', description: 'Номер телефона' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly phoneNumber?: string;

  @ApiProperty({ example: 'Грегорьевич', description: 'Отчество пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly thirdname?: string = '';
}
