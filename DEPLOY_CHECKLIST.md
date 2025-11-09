# ✅ CHECKLIST DE DEPLOY - PRODUÇÃO

## 🎯 OBJETIVO
Colocar Jhaguar em produção na Play Store em **7-10 dias**.

---

## 📅 DIA 1-2: INFRAESTRUTURA

### **1. Registrar Domínio**
- [ ] Acessar https://registro.br
- [ ] Registrar `jhaguar.com.br` (R$ 40/ano)
- [ ] Configurar nameservers (manter padrão por enquanto)

### **2. Configurar E-mail Corporativo**
- [ ] Criar conta Google Workspace (https://workspace.google.com)
- [ ] Configurar domínio `jhaguar.com.br`
- [ ] Criar e-mail `contato@jhaguar.com.br`
- [ ] Configurar MX records no Registro.br

### **3. Setup Railway (Backend)**
- [ ] Criar conta em https://railway.app
- [ ] Conectar repositório GitHub `jhaguar-backend`
- [ ] Configurar variáveis de ambiente:

```env
# Banco de Dados (Railway fornece automaticamente)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Redis (Railway fornece)
REDIS_URL=${{Redis.REDIS_URL}}

# Stripe LIVE (ATENÇÃO: Trocar de test para live)
STRIPE_SECRET_KEY=sk_live_XXXXX  # Pegar no dashboard Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_XXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXX  # Criar webhook depois

# JWT (GERAR NOVO - FORTE)
JWT_SECRET=<gerar_string_aleatoria_256_bits>

# Google Maps
GOOGLE_API_KEY=AIzaSy... # Revogar a antiga e gerar nova com restrições

# Ambiente
NODE_ENV=production
PORT=3000
```

- [ ] Fazer deploy inicial
- [ ] Copiar URL gerada (ex: `jhaguar-backend-production.up.railway.app`)
- [ ] Configurar domínio customizado:
  - Subdomínio: `api.jhaguar.com.br`
  - Apontar CNAME no Registro.br

---

## 📅 DIA 3-4: SEGURANÇA E APIs

### **4. Revocar e Regenerar API Keys**

#### **Google Maps API:**
- [ ] Acessar https://console.cloud.google.com
- [ ] **REVOGAR** chave antiga: `AIzaSyC-NSb-t5esRmI_C0a3qgQ1lDfE5GfqdhU`
- [ ] Criar nova chave com restrições:
  - **Application restrictions:**
    - Android: `com.jhaguar.app`
    - iOS: `com.jhaguar.app`
  - **API restrictions:**
    - Maps SDK for Android
    - Maps SDK for iOS
    - Places API
    - Directions API
    - Geocoding API
- [ ] Copiar nova chave

#### **Stripe:**
- [ ] Acessar https://dashboard.stripe.com
- [ ] Ativar modo **Live** (canto superior esquerdo)
- [ ] Obter chaves de produção:
  - Publishable key: `pk_live_...`
  - Secret key: `sk_live_...`
- [ ] Configurar webhook:
  - URL: `https://api.jhaguar.com.br/stripe/webhook`
  - Eventos: `payment_intent.*`, `transfer.*`
  - Copiar `webhook secret`

#### **JWT Secret:**
- [ ] Gerar string aleatória forte:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **5. Atualizar Código**

#### **Backend:**
```bash
cd /Users/lucasemanuelpereiraribeiro/Projects/jhaguar-backend
```

- [ ] Atualizar `.env.production`:
```env
DATABASE_URL=<Railway fornece>
REDIS_URL=<Railway fornece>
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
JWT_SECRET=<string_gerada>
GOOGLE_API_KEY=<nova_chave_google>
NODE_ENV=production
```

- [ ] Atualizar CORS (src/main.ts linha 15-20):
```typescript
app.enableCors({
  origin: [
    'https://jhaguar.com.br',
    'jhaguar://' // Deep linking do app
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,Accept,Origin,X-Requested-With',
});
```

- [ ] Commit e push:
```bash
git add .
git commit -m "chore: configuração de produção"
git push origin main
```

#### **Frontend:**
```bash
cd /Users/lucasemanuelpereiraribeiro/Projects/JhaguarClean
```

- [ ] Atualizar `.env`:
```env
EXPO_PUBLIC_SERVER_URL=https://api.jhaguar.com.br
EXPO_PUBLIC_GOOGLE_API_KEY=<nova_chave_google>
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
NODE_ENV=production
EXPO_PUBLIC_APP_NAME=Jhaguar
EXPO_PUBLIC_APP_VERSION=1.0.0
```

- [ ] Remover IPs hardcoded (lib/fetch.ts linha 12):
```typescript
const getApiBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_SERVER_URL;
  if (envUrl) return envUrl;

  // Fallback apenas para desenvolvimento local
  if (__DEV__) return "http://localhost:3000";

  // Produção
  return "https://api.jhaguar.com.br";
};
```

- [ ] Commit:
```bash
git add .
git commit -m "chore: configuração de produção"
git push origin main
```

---

## 📅 DIA 5-6: DOCUMENTAÇÃO LEGAL

### **6. Criar Política de Privacidade**

- [ ] Usar gerador: https://www.privacypolicygenerator.info/
- [ ] Informações necessárias:
  - Empresa: Jhaguar Tecnologia
  - E-mail: contato@jhaguar.com.br
  - App coleta: Localização, nome, e-mail, telefone
  - Uso: Geolocalização, pagamentos, notificações
  - Terceiros: Google Maps, Stripe
  - Retenção: Dados mantidos até solicitação de exclusão

- [ ] Hospedar em: https://jhaguar.com.br/privacidade.html
  - Pode usar Vercel/Netlify para site estático (grátis)

### **7. Criar Termos de Uso**

- [ ] Baseado em modelo de ride-sharing
- [ ] Incluir:
  - Regras de uso
  - Cancelamento de corridas
  - Política de reembolso
  - Limitação de responsabilidade
  - Lei aplicável (Brasil)

- [ ] Hospedar em: https://jhaguar.com.br/termos.html

### **8. Atualizar App com Links Legais**

```typescript
// Adicionar em app/(auth)/signup.tsx ou tela inicial
<View>
  <Text>
    Ao continuar, você concorda com nossos{' '}
    <Link href="https://jhaguar.com.br/termos.html">
      Termos de Uso
    </Link>
    {' e '}
    <Link href="https://jhaguar.com.br/privacidade.html">
      Política de Privacidade
    </Link>
  </Text>
</View>
```

---

## 📅 DIA 7: PREPARAR ASSETS DA PLAY STORE

### **9. Preparar Imagens**

- [ ] **Ícone (512x512 PNG):**
  - Localização: `assets/images/icon.png`
  - Verificar se está otimizado

- [ ] **Feature Graphic (1024x500 PNG):**
  - Banner principal da loja
  - Design sugestão: Logo + slogan
  - Criar em Canva ou Figma

- [ ] **Screenshots (mínimo 2, até 8):**
  - Formato: 1080x1920 ou 1080x2340
  - Telas recomendadas:
    1. Mapa com corrida ativa
    2. Seleção de tipo de corrida
    3. Chat com motorista
    4. Histórico de corridas
  - Usar emulador ou dispositivo físico
  - Adicionar molduras (https://mockuphone.com)

### **10. Escrever Descrição da Loja**

**Título:** (até 30 caracteres)
```
Jhaguar - Seu App de Corridas
```

**Descrição Curta:** (até 80 caracteres)
```
Peça corridas rápidas e seguras. Várias opções: Normal, Executivo, Pet e mais!
```

**Descrição Completa:** (até 4000 caracteres)
```markdown
# 🚗 Jhaguar - Mobilidade Inteligente

Seu novo aplicativo de corridas com opções para todos os momentos!

## 🎯 Tipos de Corrida:
- **Normal** - Econômico e confiável
- **Executivo** - Conforto premium
- **Pet** - Leve seu pet com segurança
- **Mulher** - Exclusivo para mulheres com motoristas mulheres
- **Moto** - Rápido para curtas distâncias
- **Blindado** - Máxima segurança

## ✨ Recursos:
✅ Rastreamento em tempo real
✅ Chat com motorista
✅ Múltiplas formas de pagamento
✅ Histórico de corridas
✅ Avaliações e segurança

## 🔒 Segurança:
- Verificação de motoristas
- Compartilhamento de corrida
- Suporte 24/7

Baixe agora e experimente a nova forma de se locomover!
```

---

## 📅 DIA 8-9: BUILD E PUBLICAÇÃO

### **11. Build de Produção**

```bash
cd /Users/lucasemanuelpereiraribeiro/Projects/JhaguarClean

# Limpar cache
rm -rf node_modules
npm install

# Rodar patches
npm run postinstall

# Build para Android (Play Store)
npx eas build --platform android --profile production
```

**Nota:** Se não tiver EAS configurado:
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar projeto
eas build:configure

# Fazer build
eas build --platform android --profile production
```

### **12. Registrar Conta Google Play Developer**

- [ ] Acessar: https://play.google.com/console/signup
- [ ] Pagar taxa única: US$ 25 (~R$ 125)
- [ ] E-mail: `contato@jhaguar.com.br`
- [ ] Aguardar aprovação (~24h)

### **13. Criar Aplicativo na Play Store**

- [ ] Criar novo app
- [ ] Preencher informações:
  - Nome: Jhaguar
  - Categoria: Mapas e navegação
  - E-mail de contato: contato@jhaguar.com.br
  - Política de privacidade: https://jhaguar.com.br/privacidade.html

- [ ] Upload do AAB (gerado pelo EAS)
- [ ] Adicionar screenshots
- [ ] Adicionar feature graphic
- [ ] Preencher descrições

- [ ] Questionário de classificação de conteúdo
- [ ] Declaração de permissões:
  - Localização: Rastreamento de corridas e motoristas
  - Internet: Comunicação com servidor
  - Notificações: Alertas de corrida

### **14. Submeter para Revisão**

- [ ] Revisar todas as informações
- [ ] Criar release de produção
- [ ] Enviar para revisão
- [ ] Aguardar 3-7 dias

---

## 📅 DIA 10: TESTES FINAIS

### **15. Testar Fluxo Completo**

**Passageiro:**
- [ ] Cadastro e login
- [ ] Adicionar saldo via Stripe
- [ ] Buscar corrida
- [ ] Acompanhar motorista
- [ ] Chat
- [ ] Finalizar e pagar
- [ ] Avaliar

**Motorista:**
- [ ] Cadastro e aprovação
- [ ] Ficar online
- [ ] Receber solicitação
- [ ] Aceitar corrida
- [ ] Chat
- [ ] Finalizar
- [ ] Confirmar pagamento
- [ ] Verificar saldo

### **16. Monitoramento**

- [ ] Configurar logs (Railway tem built-in)
- [ ] Testar webhooks Stripe
- [ ] Verificar Redis (cache de localização)
- [ ] Testar WebSocket (tempo real)

---

## 💰 CUSTOS TOTAIS DO SETUP

| Item | Valor | Frequência |
|------|-------|------------|
| Domínio .com.br | R$ 40 | Anual |
| Google Workspace | R$ 28 | Mensal |
| Google Play (taxa única) | R$ 125 | Uma vez |
| Railway (backend) | US$ 5 (~R$ 25) | Mensal |
| **TOTAL INICIAL** | **R$ 218** | Setup |
| **TOTAL MENSAL** | **R$ 53/mês** | Recorrente |

---

## ⚠️ LEMBRETES IMPORTANTES

### **Segurança:**
1. ✅ NUNCA commitar `.env` com chaves de produção
2. ✅ Usar variáveis de ambiente na Railway
3. ✅ Ativar 2FA no Stripe, Google Cloud, Railway
4. ✅ Fazer backup do banco semanal

### **Compliance:**
1. ✅ LGPD: Permitir exclusão de dados
2. ✅ Verificar motoristas (background check)
3. ✅ Ter processo de suporte (e-mail funcional)

### **Performance:**
1. ✅ Testar com 10+ usuários simultâneos
2. ✅ Monitorar logs de erro
3. ✅ Configurar alertas (Railway Notifications)

---

## 🎉 PÓS-LANÇAMENTO (Semana 1-4)

- [ ] Monitorar reviews da Play Store
- [ ] Responder feedbacks
- [ ] Coletar métricas de uso
- [ ] Corrigir bugs críticos
- [ ] Planejar próximas features

**Meta:** 100 downloads nos primeiros 30 dias
**Meta:** 10 corridas reais completadas

---

## 📞 SUPORTE

**Dúvidas Railway:** https://railway.app/help
**Dúvidas Stripe:** https://support.stripe.com
**Dúvidas Play Store:** https://support.google.com/googleplay/android-developer

---

**Boa sorte! 🚀**
