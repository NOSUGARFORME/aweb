import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @ApiProperty({
    example: 'StrongPassword',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly password: string;
}
