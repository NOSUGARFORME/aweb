import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly value?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly description?: string;
}
