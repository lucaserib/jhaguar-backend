import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,Accept,Origin,X-Requested-With',
  });

  const config = new DocumentBuilder()
    .setTitle('Ride-Sharing API')
    .setDescription(
      `
      API completa para aplicativo de compartilhamento de corridas.
      
      ## Tipos de Corrida Disponíveis:
      - **Normal**: Opção econômica e confiável
      - **Executivo**: Maior conforto com veículos premium
      - **Blindado**: Máxima segurança com veículos blindados
      - **Pet**: Transporte seguro para pets
      - **Mulher**: Exclusivo para mulheres com motoristas mulheres
      - **Moto**: Rápido e econômico para trajetos curtos
      - **Delivery**: Entrega de encomendas
      
      ## Principais Fluxos:
      1. **Buscar Tipos Disponíveis**: GET /ride-types/available
      2. **Obter Recomendações**: POST /maps/smart-recommendations  
      3. **Preparar Confirmação**: POST /maps/prepare-ride-confirmation
      4. **Criar Corrida**: POST /rides
      5. **Acompanhar Status**: GET /rides/my
    `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Autenticação', 'Endpoints de login e registro')
    .addTag(
      'Tipos de Corrida',
      'Gerenciamento dos tipos de corrida disponíveis',
    )
    .addTag('Maps & Localização', 'Busca de motoristas, rotas e geocodificação')
    .addTag('Corridas', 'Criação e gerenciamento de corridas')
    .addTag('Motoristas', 'Gerenciamento de perfis de motorista')
    .addTag('Passageiros', 'Gerenciamento de perfis de passageiro')
    .addTag('Veículos', 'Cadastro e gerenciamento de veículos')
    .addTag('Usuários', 'Gerenciamento de usuários')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints;
          return constraints
            ? Object.values(constraints).join(', ')
            : 'Erro de validação';
        });
        return new Error(`Dados inválidos: ${messages.join('; ')}`);
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  logger.log(`📚 Documentação da API: http://localhost:${port}/api-docs`);
  logger.log(`🎯 Ambiente: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((error) => {
  console.error('Erro ao inicializar aplicação:', error);
  process.exit(1);
});
