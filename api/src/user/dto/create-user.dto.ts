import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({
    example: 'StrongPassword',
    description: 'Пароль пользователя',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'Петр', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly surname: string;

  @ApiProperty({ example: '+375111111111', description: 'Номер телефона' })
  @IsString({ message: 'Должно быть строкой' })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'Грегорьевич', description: 'Отчество пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly thirdname?: string;

  @ApiProperty({ example: '1', description: 'Идентификатор роли' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsOptional()
  readonly roleId?: number;
}
