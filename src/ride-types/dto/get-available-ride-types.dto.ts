import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client';

export class GetAvailableRideTypesDto {
  @ApiProperty({
    description: 'Gênero do usuário solicitante',
    enum: Gender,
    example: Gender.FEMALE,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  userGender?: Gender;

  @ApiProperty({
    description: 'Se deve incluir apenas tipos ativos',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activeOnly?: boolean;

  @ApiProperty({
    description: 'Se deve incluir corridas de entrega',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  includeDelivery?: boolean;

  @ApiProperty({
    description: 'Se o usuário tem pets',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  hasPets?: boolean;
}
