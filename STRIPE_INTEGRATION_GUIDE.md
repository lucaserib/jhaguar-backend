# 🔥 GUIA COMPLETO: STRIPE PARA PRODUÇÃO

## 📋 SITUAÇÃO ATUAL

### ✅ O que está implementado:
1. **Top-up de Carteira** (add saldo via cartão)
   - Stripe Payment Intent
   - Webhooks para confirmação
   - Registro de transações

2. **Sistema de Créditos Interno**
   - Carteira de passageiros e motoristas
   - Transferências internas (wallet-to-wallet)
   - Taxa da plataforma (10%)
   - Limite negativo para motoristas (-R$ 15)

3. **Pagamentos Físicos**
   - CASH, PIX, CARD_MACHINE
   - Desconto automático da taxa

### ❌ O que falta para produção:

1. **Stripe Connect** - Para pagar motoristas
2. **Payout System** - Sacar dinheiro da carteira
3. **Webhook de produção** - URL pública
4. **Conta bancária da plataforma**

---

## 🎯 ARQUITETURA RECOMENDADA PARA PRODUÇÃO

### **Opção 1: Sistema Híbrido (RECOMENDADO)** ⭐

**Como funciona:**
```
DEPÓSITOS (Passageiro/Motorista):
- Stripe Payment Intent → Carteira do app
- Taxas: 3.9% + R$ 0,39 (Stripe)

PAGAMENTOS DE CORRIDA:
- Via carteira interna (sem taxas adicionais)
- Transferências instantâneas
- Taxa da plataforma: 10%

SAQUES (Motorista):
- Stripe Transfer → Conta bancária
- Frequência: Semanal ou sob demanda
- Taxas: R$ 2,00 por saque (Stripe)
```

**Vantagens:**
- ✅ Baixo custo operacional
- ✅ Pagamentos instantâneos
- ✅ Controle total sobre o saldo
- ✅ Flexibilidade para motoristas

**Custos:**
- Depósito: 3.9% + R$ 0,39
- Saque: R$ 2,00 fixo
- **Total para corrida de R$ 100:**
  - Passageiro deposita R$ 100 → paga R$ 4,29 taxa Stripe
  - Plataforma recebe R$ 10 (10%)
  - Motorista recebe R$ 90
  - Motorista saca R$ 90 → paga R$ 2,00 taxa
  - Motorista líquido: R$ 88
  - Plataforma líquida: R$ 7,71 (R$ 10 - R$ 2,29 Stripe)

---

### **Opção 2: Stripe Connect (Direto)**

**Como funciona:**
```
- Cada motorista tem conta Stripe Connect
- Plataforma cobra via Stripe Application Fee
- Dinheiro vai direto para motorista (menos taxa)
```

**Vantagens:**
- Menos gestão de saldo
- Compliance simplificado

**Desvantagens:**
- ❌ Custo MUITO maior: ~7% total
- ❌ Motorista precisa cadastro Stripe
- ❌ Mais complexo para KYC/AML
- ❌ Taxas por transação (não flat)

**Custos para R$ 100:**
- Taxa Stripe: R$ 4,29
- Taxa plataforma: R$ 10
- Motorista recebe: R$ 85,71
- Plataforma recebe: R$ 10

---

## 🚀 IMPLEMENTAÇÃO RECOMENDADA (Opção 1)

### **Passo 1: Manter sistema atual para pagamentos de corrida**

✅ **Já está perfeito!** Não precisa mexer.

```typescript
// src/payments/payments.service.ts (linhas 456-650)
// Tudo funcionando perfeitamente:
- processRidePaymentByMethod() ✅
- processWalletBalancePayment() ✅
- processPhysicalPayment() ✅
- calculatePlatformFees() ✅
```

### **Passo 2: Implementar sistema de Payout (NOVO)**

Criar endpoint para motorista **sacar dinheiro**:

```typescript
// src/payments/payments.service.ts

async requestPayout(
  driverId: string,
  amount: number,
  bankAccount: BankAccountInfo
): Promise<PayoutResult> {

  // 1. Verificar saldo disponível
  const wallet = await this.getOrCreateWallet(driverId);

  if (wallet.balance < amount) {
    throw new BadRequestException('Saldo insuficiente');
  }

  // 2. Verificar limite mínimo (ex: R$ 20)
  if (amount < 20) {
    throw new BadRequestException('Valor mínimo para saque: R$ 20');
  }

  // 3. Criar Stripe Transfer para conta bancária do motorista
  const payoutFee = 2.00; // Taxa fixa do Stripe
  const netAmount = amount - payoutFee;

  const transfer = await this.stripe.transfers.create({
    amount: Math.round(netAmount * 100), // centavos
    currency: 'brl',
    destination: bankAccount.stripeAccountId, // Conta Connect do motorista
    description: `Saque de R$ ${amount}`,
    metadata: {
      driverId,
      originalAmount: amount,
      fee: payoutFee
    }
  });

  // 4. Debitar da carteira
  await this.debitWallet(driverId, amount, {
    type: 'WITHDRAWAL',
    stripeTransferId: transfer.id,
    fee: payoutFee
  });

  return {
    transferId: transfer.id,
    amount: netAmount,
    fee: payoutFee,
    estimatedArrival: '1-2 dias úteis'
  };
}
```

### **Passo 3: Configurar Stripe Connect para motoristas**

```typescript
// src/drivers/drivers.service.ts

async onboardDriverToStripe(driverId: string): Promise<string> {
  const driver = await this.getDriver(driverId);

  // Criar conta Stripe Connect (Express)
  const account = await this.stripe.accounts.create({
    type: 'express',
    country: 'BR',
    email: driver.User.email,
    capabilities: {
      transfers: { requested: true }
    },
    business_profile: {
      product_description: 'Motorista de aplicativo'
    },
    metadata: {
      driverId: driver.id,
      userId: driver.User.id
    }
  });

  // Criar link de onboarding
  const accountLink = await this.stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.APP_URL}/driver/stripe-refresh`,
    return_url: `${process.env.APP_URL}/driver/stripe-success`,
    type: 'account_onboarding'
  });

  // Salvar no banco
  await this.prisma.driver.update({
    where: { id: driverId },
    data: {
      stripeConnectAccountId: account.id,
      stripeOnboardingCompleted: false
    }
  });

  return accountLink.url; // Motorista abre esse link para completar cadastro
}
```

---

## 📝 CHECKLIST DE PRODUÇÃO

### **Backend**

- [ ] Ativar conta Stripe no modo **Live**
- [ ] Obter novas chaves:
  - `STRIPE_SECRET_KEY` (sk_live_...)
  - `STRIPE_PUBLISHABLE_KEY` (pk_live_...)
  - `STRIPE_WEBHOOK_SECRET` (whsec_...)

- [ ] Configurar webhooks em https://dashboard.stripe.com/webhooks:
  ```
  Endpoint URL: https://api.jhaguar.com.br/stripe/webhook
  Eventos:
  - payment_intent.succeeded
  - payment_intent.payment_failed
  - transfer.paid
  - transfer.failed
  ```

- [ ] Criar endpoints:
  - `POST /payments/request-payout` (motorista sacar)
  - `POST /drivers/stripe-onboarding` (cadastrar conta)
  - `GET /drivers/stripe-status` (verificar status)

- [ ] Atualizar schema do banco:
  ```prisma
  model Driver {
    stripeConnectAccountId String?
    stripeOnboardingCompleted Boolean @default(false)
    bankAccount Json? // Dados sensíveis criptografados
    payoutSchedule String? // "weekly", "on_demand"
  }
  ```

### **Frontend**

- [ ] Tela de "Adicionar Saldo" (já tem ✅)
- [ ] Tela de "Sacar Dinheiro" (motorista)
- [ ] Tela de onboarding Stripe Connect
- [ ] Histórico de saques
- [ ] Notificações de saque processado

### **Compliance**

- [ ] Política de AML (Anti-Money Laundering)
- [ ] Verificação de identidade motoristas (KYC)
- [ ] Termos de uso do sistema de pagamentos
- [ ] Limite de saques diários/mensais

---

## 💰 ESTRUTURA DE TAXAS FINAL

### **Para o Passageiro:**
```
Corrida: R$ 100
Pagamento via:
  - Carteira: R$ 100 (sem taxa adicional)
  - Adicionar saldo: R$ 100 → paga R$ 4,29 Stripe
```

### **Para o Motorista:**
```
Recebe: R$ 90 (após taxa plataforma de 10%)
Saque: R$ 90 → recebe R$ 88 (R$ 2 taxa Stripe)
```

### **Para a Plataforma:**
```
Receita: R$ 10 por corrida (10%)
Custos Stripe:
  - Top-up passageiro: R$ 4,29 (absorver ou repassar)
  - Payout motorista: R$ 2,00
Lucro líquido: R$ 3,71 a R$ 7,71 por corrida
```

---

## 🎓 MIGRAÇÃO GRADUAL

### **Fase 1: Lançamento (Mês 1-3)**
- Sistema atual (apenas carteira interna)
- Pagamentos físicos predominantes
- Sem Stripe Connect

### **Fase 2: Expansão (Mês 4-6)**
- Adicionar Stripe Connect para motoristas
- Sistema de payout manual (aprovação admin)
- Limite de saque: R$ 100/dia

### **Fase 3: Automatização (Mês 7+)**
- Payout automático semanal
- Sem limites (após KYC)
- Dashboard de analytics

---

## ⚠️ IMPORTANTE PARA PRODUÇÃO

### **1. Segurança**
```env
# Produção
STRIPE_SECRET_KEY=sk_live_xxxxx  # NUNCA commitar
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # OK commitar
```

### **2. Rate Limiting**
Já implementado ✅ (src/app.module.ts com ThrottlerModule)

### **3. Idempotência**
Já implementado ✅ (src/common/services/idempotency.service.ts)

### **4. Logging**
Adicionar monitoramento:
```typescript
// Sentry, DataDog, ou LogRocket
logger.error('Stripe payout failed', {
  driverId,
  amount,
  error: error.message
});
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Agora (Antes do Launch):**
   - Migrar para chaves Live do Stripe ✅
   - Configurar webhook em produção ✅
   - Testar fluxo completo de pagamento ✅

2. **Pós-Launch (1-2 meses):**
   - Implementar Stripe Connect
   - Sistema de payout
   - Dashboard financeiro para motoristas

3. **Futuro (6+ meses):**
   - Pagamento recorrente/assinatura
   - Programa de fidelidade
   - Integração com bancos (Pix automático)
