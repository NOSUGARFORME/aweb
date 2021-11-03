import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Почтовый адрес',
  })
  readonly email: string;

  @ApiProperty({
    example: 'StrongPassword',
    description: 'Пароль пользователя',
  })
  readonly password: string;

  @ApiProperty({ example: 'Петр', description: 'Имя пользователя' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  readonly surname: string;

  @ApiProperty({ example: '+375111111111', description: 'Номер телефона' })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'Грегорьевич', description: 'Отчество пользователя' })
  readonly thirdname?: string;
}
