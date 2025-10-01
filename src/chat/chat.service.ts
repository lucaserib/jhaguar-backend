import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMessageDto,
  ChatResponseDto,
  ChatMessageResponseDto,
} from './dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateChatByRideId(
    rideId: string,
    userId: string,
  ): Promise<ChatResponseDto> {
    // CORREÇÃO: Verificar se a corrida existe primeiro para evitar foreign key errors
    console.log(`💬 [ChatService] Checking ride ${rideId} for user ${userId}`);

    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { Passenger: {
          include: { User: true },
        },
        Driver: {
          include: { User: true },
        },
      },
    });

    if (!ride) {
      console.error(`💬 [ChatService] Ride not found: ${rideId}`);
      throw new NotFoundException('Corrida não encontrada');
    }

    console.log(`💬 [ChatService] Ride found: ${rideId}, status: ${ride.status}`);

    // CORREÇÃO: Verificar se a corrida ainda existe no banco (double check)
    const rideExists = await this.prisma.ride.count({
      where: { id: rideId }
    });

    if (rideExists === 0) {
      console.error(`💬 [ChatService] Ride was deleted: ${rideId}`);
      throw new NotFoundException('Corrida foi removida');
    }

    // Verificar se o usuário é participante da corrida
    const isParticipant =
      ride.Passenger.userId === userId ||
      (ride.Driver && ride.Driver.userId === userId);

    if (!isParticipant) {
      throw new ForbiddenException('Acesso negado para esta conversa');
    }

    // Verificar se a corrida permite chat - incluir todos os estados ativos
    const allowedStatuses = ['ACCEPTED', 'IN_PROGRESS'];
    const disallowedStatuses = ['CANCELLED', 'COMPLETED', 'REJECTED'];

    if (disallowedStatuses.includes(ride.status)) {
      if (ride.status === 'CANCELLED') {
        throw new BadRequestException(
          'Chat não está disponível para corridas canceladas',
        );
      }
      if (ride.status === 'COMPLETED') {
        throw new BadRequestException(
          'Chat não está mais disponível para corridas finalizadas',
        );
      }
      if (ride.status === 'REJECTED') {
        throw new BadRequestException(
          'Chat não está disponível para corridas rejeitadas',
        );
      }
    }

    // Permitir chat apenas se a corrida tem um motorista (foi aceita)
    if (ride.status === 'REQUESTED') {
      throw new BadRequestException(
        'Chat estará disponível após um motorista aceitar a corrida',
      );
    }

    // Buscar ou criar chat
    let chat = await this.prisma.rideChat.findUnique({
      where: { rideId },
      include: {
        ChatMessage: {
          include: {
            User: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        Ride: {
          include: { Passenger: {
              include: { User: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                  },
                },
              },
            },
            Driver: {
              include: { User: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!chat) {
      console.log(`💬 [ChatService] Creating chat for ride ${rideId}`);

      // CORREÇÃO: Verificar novamente se a corrida existe antes de criar o chat
      const finalRideCheck = await this.prisma.ride.findUnique({
        where: { id: rideId },
        select: { id: true }
      });

      if (!finalRideCheck) {
        console.error(`💬 [ChatService] Ride deleted while creating chat: ${rideId}`);
        throw new NotFoundException('Corrida foi removida durante a criação do chat');
      }

      // Usar try-catch com upsert para lidar com race conditions e foreign key errors
      try {
        chat = await this.prisma.rideChat.upsert({
          where: { rideId },
          create: {
            rideId,
            isActive: true,
          },
          update: {
            isActive: true,
          },
          include: {
            ChatMessage: {
              include: {
                User: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                  },
                },
              },
              orderBy: { createdAt: 'asc' },
            },
            Ride: {
              include: { Passenger: {
                  include: { User: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                      },
                    },
                  },
                },
                Driver: {
                  include: { User: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        console.log(`💬 [ChatService] Chat created successfully for ride ${rideId}`);

      } catch (error) {
        console.error(`💬 [ChatService] Error creating chat for ride ${rideId}:`, {
          code: error.code,
          message: error.message,
          constraint: error.meta?.constraint
        });

        // Se houve erro de constraint duplicada, tentar buscar novamente
        if (error.code === 'P2002') {
          console.log(`💬 [ChatService] Chat already exists, fetching existing for ride ${rideId}`);
          chat = await this.prisma.rideChat.findUnique({
            where: { rideId },
            include: {
              ChatMessage: {
                include: {
                  User: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      profileImage: true,
                    },
                  },
                },
                orderBy: { createdAt: 'asc' },
              },
              Ride: {
                include: { Passenger: {
                    include: { User: {
                        select: {
                          id: true,
                          firstName: true,
                          lastName: true,
                          profileImage: true,
                        },
                      },
                    },
                  },
                  Driver: {
                    include: { User: {
                        select: {
                          id: true,
                          firstName: true,
                          lastName: true,
                          profileImage: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (!chat) {
            console.error(`💬 [ChatService] Could not find chat after constraint error for ride ${rideId}`);
            throw new Error('Não foi possível criar ou encontrar o chat');
          }
        }
        // Se houve erro de foreign key (corrida foi deletada)
        else if (error.code === 'P2003') {
          console.error(`💬 [ChatService] Foreign key constraint error - ride was deleted: ${rideId}`);
          throw new NotFoundException('Corrida foi removida - não é possível criar chat');
        }
        else {
          // Re-throw outros erros
          console.error(`💬 [ChatService] Unexpected error creating chat:`, error);
          throw error;
        }
      }
    }

    return this.formatChatResponse(chat);
  }

  async sendMessage(
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<ChatMessageResponseDto> {
    const { rideId, content, type, senderType } = createMessageDto;

    // Verificar se o chat existe e se o usuário tem permissão
    const chat = await this.getOrCreateChatByRideId(rideId, userId);

    // Validar se o senderType está correto para o usuário
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Driver: true, Passenger: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isDriver = !!user.Driver;
    const isPassenger = !!user.Passenger;

    if (senderType === 'DRIVER' && !isDriver) {
      throw new ForbiddenException('Usuário não é motorista');
    }

    if (senderType === 'PASSENGER' && !isPassenger) {
      throw new ForbiddenException('Usuário não é passageiro');
    }

    // Criar mensagem
    const message = await this.prisma.chatMessage.create({
      data: {
        chatId: chat.id,
        senderId: userId,
        senderType,
        content,
        type: type || 'TEXT',
      },
      include: {
        User: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
      },
    });

    return this.formatMessageResponse(message);
  }

  async markMessagesAsRead(rideId: string, userId: string): Promise<void> {
    // Verificar permissão
    const chat = await this.getOrCreateChatByRideId(rideId, userId);

    // Marcar mensagens como lidas (exceto as do próprio usuário)
    await this.prisma.chatMessage.updateMany({
      where: {
        chatId: chat.id,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async getUnreadMessageCount(rideId: string, userId: string): Promise<number> {
    // Verificar permissão
    const chat = await this.getOrCreateChatByRideId(rideId, userId);

    const count = await this.prisma.chatMessage.count({
      where: {
        chatId: chat.id,
        senderId: { not: userId },
        isRead: false,
      },
    });

    return count;
  }

  async deactivateChat(rideId: string): Promise<void> {
    await this.prisma.rideChat.updateMany({
      where: { rideId },
      data: { isActive: false },
    });
  }

  private formatChatResponse(chat: any): ChatResponseDto {
    return {
      id: chat.id,
      rideId: chat.rideId,
      isActive: chat.isActive,
      createdAt: chat.createdAt,
      messages: chat.ChatMessage.map(this.formatMessageResponse),
      ride: {
        id: chat.Ride.id,
        status: chat.Ride.status,
        originAddress: chat.Ride.originAddress,
        destinationAddress: chat.Ride.destinationAddress,
        passenger: {
          user: chat.Ride.Passenger.User,
        },
        driver: chat.Ride.Driver ? {
              user: chat.Ride.Driver.User,
            }
          : undefined,
      },
    };
  }

  private formatMessageResponse(message: any): ChatMessageResponseDto {
    return {
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      senderType: message.senderType,
      content: message.content,
      type: message.type,
      isRead: message.isRead,
      readAt: message.readAt,
      createdAt: message.createdAt,
      User: message.User,
    };
  }
}
