import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  readonly login: string;

  @ApiProperty({
    example: 'StrongPassword',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
