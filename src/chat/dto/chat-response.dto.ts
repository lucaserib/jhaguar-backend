export class ChatMessageResponseDto {
  id: string;
  chatId: string;
  senderId: string;
  senderType: string;
  content: string;
  type: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  User: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
}

export class ChatResponseDto {
  id: string;
  rideId: string;
  isActive: boolean;
  createdAt: Date;
  messages: ChatMessageResponseDto[];
  ride: {
    id: string;
    status: string;
    originAddress: string;
    destinationAddress: string;
    passenger: {
      user: {
        id: string;
        firstName: string;
        lastName: string;
        profileImage?: string;
      };
    };
    driver?: {
      user: {
        id: string;
        firstName: string;
        lastName: string;
        profileImage?: string;
      };
    };
  };
}
