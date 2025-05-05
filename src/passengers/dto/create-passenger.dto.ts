import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePassengerDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Preferência por motorista feminina',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  prefersFemaleDriver?: boolean;

  @ApiProperty({
    description: 'Tem necessidades especiais',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  specialNeeds?: boolean;

  @ApiProperty({
    description: 'Descrição das necessidades especiais',
    example: 'Preciso de espaço para cadeira de rodas',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialNeedsDesc?: string;
}
