import { IsString, IsNotEmpty, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LOCATION = 'LOCATION',
  AUDIO = 'AUDIO',
}

export class SendMessageDto {
  @ApiProperty({ description: 'ID da corrida' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'Conteúdo da mensagem', maxLength: 1000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @ApiProperty({
    description: 'Tipo da mensagem',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  @IsEnum(MessageType)
  @IsOptional()
  type?: MessageType = MessageType.TEXT;

  @ApiProperty({
    description: 'Metadados adicionais (coordenadas, URL, etc)',
    required: false,
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
