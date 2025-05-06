import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateDriverStatusDto {
  @ApiProperty({
    description: 'Status do motorista',
    enum: Status,
    example: Status.APPROVED,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
