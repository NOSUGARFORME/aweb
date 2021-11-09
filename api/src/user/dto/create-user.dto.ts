import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

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
  @Matches(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/, {
    message:
      'Пароль должен содержать 8 символов, хотябы одну букву и одну цифру',
  })
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
  readonly thirdname?: string;
}
