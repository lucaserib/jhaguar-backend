import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'ID do usuário no Clerk',
    example: 'user_2NxVYQXSMeX0zJ0OZ1yXkNtRMUF',
  })
  @IsString()
  @IsNotEmpty()
  clerkId: string;
}
