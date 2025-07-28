FROM node:20-alpine AS development

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências e garantir que o Stripe esteja incluído
RUN npm ci || npm install
RUN npm install stripe @types/stripe --save

# Copiar arquivos do projeto
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Compilar aplicação
RUN npm run build

# Produção
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/prisma ./prisma

# Expor porta
EXPOSE 3000

# Inicializar aplicação
CMD ["node", "dist/main"]