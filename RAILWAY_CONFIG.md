# 🚂 Configuração do Railway - Jhaguar Backend

## 📋 Pré-requisitos

Antes de fazer deploy no Railway, você precisa configurar as variáveis de ambiente corretamente.

## 🔐 Gerar JWT_SECRET

Execute este comando para gerar uma chave segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copie o resultado!** Você vai precisar dele.

## ⚙️ Configurar Variáveis de Ambiente no Railway

### 1. Acessar Railway Dashboard

1. Acesse [railway.app](https://railway.app)
2. Selecione seu projeto **jhaguar-backend**
3. Clique na aba **Variables**

### 2. Configurar Variáveis Obrigatórias

Adicione as seguintes variáveis (clique em **+ New Variable** para cada uma):

#### 🔴 CRÍTICAS (obrigatórias para funcionar):

```env
NODE_ENV=production
JWT_SECRET=<cole-o-valor-gerado-acima>
GOOGLE_API_KEY=<sua-chave-do-google-maps>
```

#### 🟡 IMPORTANTES (para CORS funcionar):

```env
FRONTEND_URL=https://jhaguar.com
MOBILE_APP_URL=
```

> **Nota:** `MOBILE_APP_URL` pode ficar vazio porque apps mobile nativos não precisam de CORS.

#### 🟢 PAGAMENTOS (configurar quando for lançar):

Para **testes** (use estas agora):
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Para **produção** (trocar depois quando lançar):
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 🔵 BANCO DE DADOS E REDIS (já configurados automaticamente):

O Railway configura automaticamente:
- ✅ `DATABASE_URL` (do serviço PostgreSQL)
- ✅ `REDIS_URL` (do serviço Redis)

**Não precisa adicionar manualmente!**

## 📸 Print de Como Deve Ficar

Suas variáveis devem estar assim no Railway:

```
NODE_ENV             production
JWT_SECRET           a1b2c3d4e5f6... (64 caracteres)
GOOGLE_API_KEY       AIzaSy...
FRONTEND_URL         https://jhaguar.com
MOBILE_APP_URL       (vazio ou não definido)
STRIPE_SECRET_KEY    sk_test_...
STRIPE_PUBLISHABLE_KEY  pk_test_...
STRIPE_WEBHOOK_SECRET   whsec_...
DATABASE_URL         postgresql://... (auto)
REDIS_URL            redis://... (auto)
```

## ✅ Checklist de Verificação

Antes de fazer deploy, verifique:

- [ ] ✅ JWT_SECRET configurado com 64 caracteres hex
- [ ] ✅ NODE_ENV=production
- [ ] ✅ GOOGLE_API_KEY configurado
- [ ] ✅ FRONTEND_URL configurado
- [ ] ✅ STRIPE keys configuradas (mode test por enquanto)
- [ ] ✅ DATABASE_URL existe (Railway gera automaticamente)
- [ ] ✅ REDIS_URL existe (Railway gera automaticamente)

## 🚀 Fazer Deploy

Após configurar as variáveis:

### Opção 1: Deploy Automático (Recomendado)

1. Faça commit e push das correções:
   ```bash
   git add .
   git commit -m "fix: corrigir CORS, JWT e WebSocket security"
   git push -u origin claude/backend-setup-011CUy9TjTD9s8LqeBz3LueT
   ```

2. No Railway, clique em **Deploy** (ou aguarde deploy automático)

### Opção 2: Deploy Manual

No Railway Dashboard:
1. Clique no botão **Deploy**
2. Aguarde o build completar (~3-5 minutos)

## 🔍 Verificar se Funcionou

Após o deploy, verifique os logs:

1. No Railway, clique em **View Logs**
2. Procure por estas mensagens de sucesso:

```
✅ Aplicação rodando em: http://localhost:3000
🎯 Ambiente: production
🔌 WebSocket Gateways disponíveis
```

3. **NÃO deve aparecer:**
   - ❌ "JWT_SECRET não configurado em produção"
   - ❌ "REDIS_URL not found"
   - ❌ "CORS blocked"

## 🧪 Testar a API

### Teste 1: Health Check

```bash
curl https://seu-projeto.railway.app/
```

Deve retornar: `{ "status": "ok" }`

### Teste 2: CORS

```bash
curl -H "Origin: https://jhaguar.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://seu-projeto.railway.app/auth/login
```

Deve retornar headers com `Access-Control-Allow-Origin`

### Teste 3: WebSocket

No seu app React Native, tente conectar ao WebSocket. Deve funcionar sem erros de CORS.

## 🐛 Troubleshooting

### Erro: "JWT_SECRET não configurado"

**Problema:** A variável JWT_SECRET não está configurada ou está vazia.

**Solução:**
1. Gere uma nova chave: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Adicione no Railway Variables: `JWT_SECRET=<valor-gerado>`
3. Faça redeploy

### Erro: "CORS blocked"

**Problema:** FRONTEND_URL não está configurado ou está errado.

**Solução:**
1. Verifique se FRONTEND_URL=https://jhaguar.com (sem trailing slash)
2. Certifique-se que NODE_ENV=production
3. Faça redeploy

### Erro: "SELECT NaN" (Redis)

**Problema:** REDIS_URL está mal formatada.

**Solução:**
1. Verifique se o serviço Redis está ativo no Railway
2. O REDIS_URL deve ser gerado automaticamente
3. Se não existir, adicione o serviço Redis no Railway

### App mobile não conecta

**Problema:** Configuração incorreta no frontend.

**Solução no app mobile (.env):**
```env
EXPO_PUBLIC_SERVER_URL=https://api.jhaguar.com
# SEM http:// SEM porta SEM trailing slash
```

## 📝 Próximos Passos

Depois do deploy funcionar:

1. ✅ Testar login no app mobile
2. ✅ Testar criação de corrida
3. ✅ Testar WebSocket (notificações em tempo real)
4. ✅ Verificar logs de erro
5. ⚠️ Trocar Stripe para modo live quando lançar
6. ⚠️ Revogar e criar nova Google Maps API Key com restrições

## 🔐 Segurança

### ⚠️ IMPORTANTE:

1. **NUNCA** exponha JWT_SECRET publicamente
2. **NUNCA** commite arquivos `.env` no git
3. **REVOGUE** a API key antiga do Google Maps (foi exposta)
4. **CRIE** nova API key com restrições:
   - Android: com bundle ID `com.jhaguar.app`
   - iOS: com bundle ID `com.jhaguar.app`
   - APIs permitidas: Maps SDK, Directions API, Geocoding API

## 📞 Suporte

Se continuar com problemas:

1. Verifique os logs do Railway
2. Teste localmente com `NODE_ENV=production`
3. Verifique se todas as variáveis estão configuradas corretamente
