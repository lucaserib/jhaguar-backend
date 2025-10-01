FROM node:20-alpine AS development

# Instalar dependências do sistema para Prisma
RUN apk add --no-cache openssl openssl-dev

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Expor porta
EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "run", "start:dev"]

# Produção
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production && npm cache clean --force

# Copiar arquivos do projeto
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Compilar aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Inicializar aplicação
CMD ["node", "dist/main"]