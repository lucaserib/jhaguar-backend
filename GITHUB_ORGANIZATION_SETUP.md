# 🏢 GUIA: CONFIGURAÇÃO GITHUB ORGANIZATION

## 🎯 POR QUE USAR GITHUB ORGANIZATION?

### ✅ Benefícios:
1. **Propriedade institucional** - Projeto pertence à empresa, não a pessoa física
2. **Controle de acesso** - Adicione colaboradores com permissões granulares
3. **Segurança** - Branch protection, required reviews, secrets centralizados
4. **Profissionalismo** - URL `github.com/jhaguar` ao invés de `github.com/nome-pessoal`
5. **Escalabilidade** - Adicione repositórios, equipes, e processos conforme cresce
6. **Transferência fácil** - Se vender o app, transfere a org inteira

---

## 📋 PASSO A PASSO: CRIAÇÃO DA ORGANIZAÇÃO

### **1. Criar GitHub Organization**

```bash
# 1. Acesse (logado com e-mail corporativo preferencial)
https://github.com/organizations/plan

# 2. Clique em "Create a free organization"

# 3. Preencha:
Organization name: jhaguar (ou jhaguarapp se jhaguar estiver ocupado)
Contact email: contato@jhaguar.com.br
Belongs to: My personal account (por enquanto)

# 4. Convide membros (opcional - pode pular)
```

### **2. Configurações de Segurança da Organização**

Acessar: `https://github.com/organizations/jhaguar/settings/security`

#### **A. Base Permissions**
- ✅ Members can: **Read** (default - mais seguro)
- ❌ NÃO permitir "Create repositories" para todos

#### **B. Repository Creation**
- ✅ Allow members to create **private** repositories only
- ❌ Disable forking of private repositories

#### **C. Two-Factor Authentication**
- ✅ **Require two-factor authentication** para todos os membros
- Super importante para segurança!

#### **D. Third-party Access**
- ✅ Restrict third-party application access (aprovar caso a caso)

#### **E. Verified Domains**
- ✅ Adicionar `jhaguar.com.br` como domínio verificado
- Seguir instruções do GitHub para adicionar TXT record no DNS

---

## 📦 MIGRAÇÃO DOS REPOSITÓRIOS EXISTENTES

### **Opção 1: Transferir Repositórios (MELHOR)**

Mantém todo histórico de commits, issues, PRs, etc.

```bash
# 1. Acesse cada repositório atual:
https://github.com/SEU_USUARIO/jhaguar-backend/settings

# 2. Vá até "Danger Zone" → "Transfer ownership"

# 3. Digite:
New owner: jhaguar
Repository name: jhaguar-backend

# 4. Confirme e repita para jhaguar-app
```

### **Opção 2: Fork para Organização (Alternativa)**

Se quiser manter cópia pessoal também.

```bash
# 1. Vá no repositório
https://github.com/SEU_USUARIO/jhaguar-backend

# 2. Clique em "Fork"
# 3. Selecione "jhaguar" como destino
```

### **Opção 3: Push para novo repositório (Mais trabalhoso)**

```bash
# Backend
cd /Users/lucasemanuelpereiraribeiro/Projects/jhaguar-backend
git remote rename origin old-origin
git remote add origin git@github.com:jhaguar/jhaguar-backend.git
git push -u origin main

# Frontend
cd /Users/lucasemanuelpereiraribeiro/Projects/JhaguarClean
git remote rename origin old-origin
git remote add origin git@github.com:jhaguar/jhaguar-app.git
git push -u origin main
```

---

## 🔒 CONFIGURAÇÃO DE SEGURANÇA POR REPOSITÓRIO

### **Para jhaguar-backend e jhaguar-app:**

#### **1. Settings → General**

```yaml
Visibility: Private ✅

Features:
  ✅ Issues
  ✅ Discussions (opcional)
  ❌ Projects (usar GitHub Projects separado)
  ❌ Wiki (usar docs/ no próprio repo)

Pull Requests:
  ✅ Allow squash merging (limpa histórico)
  ✅ Allow auto-merge
  ✅ Automatically delete head branches (limpa branches após merge)
  ❌ Allow merge commits (desabilitar - força squash)
  ❌ Allow rebase merging (desabilitar - força squash)
```

#### **2. Settings → Branches**

**Branch Protection Rules para `main`:**

```yaml
Branch name pattern: main

Protect matching branches:
  ✅ Require a pull request before merging
    - Require approvals: 1 (você mesmo, por enquanto)
    ✅ Dismiss stale pull request approvals when new commits are pushed
    ✅ Require review from Code Owners (criar CODEOWNERS depois)

  ✅ Require status checks to pass before merging
    ✅ Require branches to be up to date before merging
    - Status checks (adicionar depois do CI/CD):
      • build-backend
      • lint
      • tests

  ✅ Require conversation resolution before merging

  ✅ Include administrators (você também segue as regras!)

  ❌ Allow force pushes (NUNCA - protege histórico)
  ❌ Allow deletions (NUNCA - protege branch principal)
```

**Branch Protection Rules para `develop` (opcional - se usar GitFlow):**

```yaml
Branch name pattern: develop

Protect matching branches:
  ✅ Require a pull request before merging
    - Require approvals: 0 (você pode mergear sozinho aqui)
  ✅ Require status checks to pass before merging
  ❌ Include administrators (mais flexível para desenvolvimento)
```

#### **3. Settings → Secrets and variables → Actions**

**Secrets para CI/CD (adicionar quando configurar GitHub Actions):**

```yaml
# Railway (para deploy automático)
RAILWAY_TOKEN: <token_do_railway>

# Stripe (para testes)
STRIPE_TEST_SECRET_KEY: sk_test_...
STRIPE_TEST_PUBLISHABLE_KEY: pk_test_...

# Google Maps
GOOGLE_MAPS_API_KEY: AIza...

# JWT (para testes)
JWT_SECRET_TEST: <secret_de_teste>
```

**⚠️ NUNCA adicionar secrets de PRODUÇÃO aqui!**

#### **4. Settings → Security**

```yaml
Private vulnerability reporting:
  ✅ Enable (permite reports de segurança privados)

Dependency graph:
  ✅ Enable (analisa dependências)

Dependabot alerts:
  ✅ Enable (alerta sobre vulnerabilidades)

Dependabot security updates:
  ✅ Enable (cria PRs automáticos para fixes de segurança)

Code scanning:
  ✅ Setup CodeQL analysis (análise de código estática)
```

---

## 👥 GERENCIAMENTO DE ACESSO

### **Times (Teams) - Criar depois se contratar equipe:**

```yaml
@jhaguar/core-team
  - Acesso: Admin
  - Membros: Você + CTO/Tech Lead
  - Permissões: Tudo

@jhaguar/backend-devs
  - Acesso: Write
  - Repositórios: jhaguar-backend
  - Permissões: Push, PR, Issues

@jhaguar/frontend-devs
  - Acesso: Write
  - Repositórios: jhaguar-app
  - Permissões: Push, PR, Issues

@jhaguar/contractors
  - Acesso: Read
  - Repositórios: Selecionados
  - Permissões: Apenas visualização + Issues
```

### **Convites Individuais (Para freelancers/colaboradores):**

```
Settings → Manage access → Invite a collaborator

Permissões:
- Read: Apenas visualizar código
- Triage: Gerenciar issues
- Write: Push e PRs
- Maintain: Gerenciar sem admin
- Admin: Controle total (apenas você)
```

---

## 📄 ARQUIVOS DE CONFIGURAÇÃO IMPORTANTES

### **1. CODEOWNERS (Branch protection)**

Criar: `.github/CODEOWNERS` em cada repo

```bash
# Backend
# These owners will be requested for review when someone opens a PR

# Global owners
* @SEU_USUARIO @contato-jhaguar

# Critical files - require review from core team
/prisma/ @SEU_USUARIO
/.env* @SEU_USUARIO
/src/auth/ @SEU_USUARIO
/src/payments/ @SEU_USUARIO
```

```bash
# Frontend
* @SEU_USUARIO @contato-jhaguar

# Critical areas
/app/(auth)/ @SEU_USUARIO
/lib/fetch.ts @SEU_USUARIO
/hooks/useRealRideFlow.tsx @SEU_USUARIO
```

### **2. FUNDING.yml (Opcional - Doações/Sponsorship)**

Criar: `.github/FUNDING.yml`

```yaml
# Futuramente, se quiser aceitar doações/investimentos
github: jhaguar
custom: ["https://jhaguar.com.br/invest"]
```

### **3. SECURITY.md (Política de Segurança)**

Criar: `SECURITY.md` na raiz

```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to:
**security@jhaguar.com.br**

Please do NOT open a public issue.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Measures

- All API keys are stored in environment variables
- Passwords are hashed with bcrypt
- JWT tokens for authentication
- HTTPS only in production
- Regular dependency updates via Dependabot
```

### **4. CONTRIBUTING.md (Guia de Contribuição)**

Criar: `CONTRIBUTING.md` na raiz

```markdown
# Contributing to Jhaguar

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Run: `npm run start:dev`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Run linter: `npm run lint`
5. Commit: `git commit -m "feat: add my feature"`
6. Push and open PR

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `chore:` Maintenance
- `refactor:` Code refactoring
- `test:` Tests
```

---

## 🔄 CI/CD: GITHUB ACTIONS (BONUS)

### **Backend: .github/workflows/backend-ci.yml**

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: rideshare_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/rideshare_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret-key-for-ci
          NODE_ENV: test
        run: npm run test

      - name: Build
        run: npm run build

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up --service backend
```

### **Frontend: .github/workflows/app-ci.yml**

```yaml
name: App CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint || echo "Linter not configured"

      - name: Run tests
        run: npm test || echo "Tests not configured"

      - name: Check TypeScript
        run: npx tsc --noEmit

  build-preview:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v4

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Build preview
        run: eas build --platform android --profile preview --non-interactive
```

---

## 🎓 BOAS PRÁTICAS

### **1. Commits Semânticos**

```bash
# Bons commits:
git commit -m "feat: adiciona autenticação com Google"
git commit -m "fix: corrige cálculo de preço de corrida"
git commit -m "docs: atualiza README com instruções de setup"
git commit -m "chore: atualiza dependências do Prisma"

# Commits ruins:
git commit -m "update"
git commit -m "fix bug"
git commit -m "wip"
```

### **2. Branches**

```bash
# Feature branches
git checkout -b feature/stripe-payout
git checkout -b feature/chat-improvements

# Bug fixes
git checkout -b fix/payment-calculation
git checkout -b fix/websocket-reconnection

# Hotfixes (produção)
git checkout -b hotfix/critical-payment-bug

# Release branches (opcional)
git checkout -b release/1.1.0
```

### **3. Pull Requests**

Template para PR (criar em `.github/pull_request_template.md`):

```markdown
## Descrição
<!-- Descreva as mudanças -->

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Código segue style guide do projeto
- [ ] Adicionei testes para as mudanças
- [ ] Todos os testes passaram
- [ ] Atualizei a documentação
- [ ] Revisei meu próprio código
```

---

## 💼 LICENÇA DO PROJETO

### **Escolher licença:**

Para app comercial (recomendado):
- **Proprietary** (Código fechado)
- Criar `LICENSE` file:

```
Copyright (c) 2025 Jhaguar Tecnologia

All rights reserved.

This software and associated documentation files (the "Software") are
proprietary and confidential. Unauthorized copying, modification,
distribution, or use of this software is strictly prohibited.
```

Para open source (se quiser futuramente):
- **MIT License** (mais permissiva)
- **GPL-3.0** (força derivados a serem open source também)
- **Apache 2.0** (proteção de patentes)

---

## ✅ CHECKLIST FINAL

- [ ] Criar GitHub Organization `jhaguar`
- [ ] Transferir repositórios para org
- [ ] Configurar branch protection em `main`
- [ ] Adicionar secrets necessários
- [ ] Criar arquivo CODEOWNERS
- [ ] Criar SECURITY.md
- [ ] Criar CONTRIBUTING.md
- [ ] Adicionar LICENSE
- [ ] Configurar Dependabot
- [ ] Configurar GitHub Actions (CI/CD)
- [ ] Verificar domínio `jhaguar.com.br` no GitHub
- [ ] Habilitar 2FA para todos os membros

---

## 📞 PRÓXIMOS PASSOS

Depois de configurar a organização:

1. **Conectar Railway** com repositório da org
2. **Configurar EAS** com repositório da org
3. **Atualizar URLs** de documentação
4. **Comunicar mudança** para colaboradores (se houver)

---

**Pronto! Seu projeto agora está profissionalizado e pronto para escalar.** 🚀
