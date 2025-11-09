export class ChatMessageResponseDto {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderType: string;
  content: string;
  type: string;
  isRead: boolean;
  readAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export class ChatResponseDto {
  id: string;
  rideId: string;
  isActive: boolean;
  endedAt?: Date;
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

export interface ChatRoomResponse {
  id: string;
  rideId: string;
  isActive: boolean;
  participant: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  unreadCount: number;
  lastMessage: ChatMessageResponseDto | null;
  createdAt: Date;
  endedAt: Date | null;
}
