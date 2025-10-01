import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Tentar múltiplas formas de extrair o userId para garantir compatibilidade
    const userId = user?.id || user?.sub || user?.userId;

    if (!userId) {
      throw new Error('User ID não encontrado no token JWT');
    }

    return userId;
  },
);