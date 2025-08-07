import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NotifyPassengerDto {
  @ApiProperty({
    description: 'ID da corrida',
    example: 'uuid-ride-id',
  })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({
    description: 'Tipo da notificação',
    example: 'DRIVER_ARRIVED',
    enum: ['DRIVER_ARRIVED', 'RIDE_STARTED', 'RIDE_COMPLETED', 'DRIVER_DELAYED', 'CUSTOM'],
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Mensagem personalizada da notificação',
    example: 'Cheguei no local de embarque',
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}