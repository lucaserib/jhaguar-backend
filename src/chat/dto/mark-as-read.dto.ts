import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkAsReadDto {
  @ApiProperty({ description: 'ID da corrida' })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ description: 'IDs das mensagens a marcar como lidas' })
  @IsArray()
  @IsString({ each: true })
  messageIds: string[];
}
