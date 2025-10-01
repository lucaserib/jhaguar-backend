import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';

export enum MessageType {
  TEXT = 'TEXT',
  LOCATION = 'LOCATION',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
}

export enum MessageSenderType {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

export class CreateMessageDto {
  @IsUUID()
  @IsNotEmpty()
  rideId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(MessageType)
  @IsOptional()
  type?: MessageType = MessageType.TEXT;

  @IsEnum(MessageSenderType)
  @IsNotEmpty()
  senderType: MessageSenderType;
}
