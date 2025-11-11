# Jhaguar - Website Institucional

Este diretório contém o site institucional da Jhaguar, incluindo:

- Landing page
- Política de Privacidade (LGPD compliant)
- Termos de Uso
- Central de Suporte

## 📁 Arquivos

- `index.html` - Página inicial / Landing page
- `privacidade.html` - Política de Privacidade (obrigatório para App Store e Play Store)
- `termos.html` - Termos de Uso (obrigatório para App Store e Play Store)
- `suporte.html` - Central de Ajuda e Suporte
- `vercel.json` - Configuração de deploy no Vercel

## 🚀 Deploy no Vercel

### Opção 1: Deploy via Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `jhaguar-backend`
5. Configure o projeto:
   - **Framework Preset:** Other
   - **Root Directory:** `website`
   - **Build Command:** (deixe em branco)
   - **Output Directory:** `./`
6. Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Entrar no diretório do website
cd website

# Fazer login no Vercel
vercel login

# Deploy
vercel --prod
```

### Opção 3: Deploy automático via Git

1. No dashboard do Vercel, conecte o repositório
2. Configure para fazer deploy automático da pasta `website`
3. Cada push na branch principal fará deploy automático

## 🌐 Configurar Domínio Personalizado

### No Vercel:

1. Vá em Project Settings → Domains
2. Adicione o domínio: `jhaguar.com` e `www.jhaguar.com`
3. Vercel fornecerá os registros DNS necessários

### No Squarespace (seu provedor de domínio):

**Para o domínio raiz (jhaguar.com):**

1. Acesse DNS Settings no Squarespace
2. Adicione um registro **A**:
   - **Host:** `@`
   - **Aponta para:** `76.76.21.21` (IP do Vercel)

**Para www (www.jhaguar.com):**

3. Adicione um registro **CNAME**:
   - **Host:** `www`
   - **Aponta para:** `cname.vercel-dns.com`

**Verificação:**

4. Volte ao Vercel e clique em "Verify" para cada domínio
5. Pode levar de 24-48h para propagar completamente

## 📱 URLs Necessárias para as Lojas

Após o deploy, você terá as seguintes URLs para usar na App Store e Play Store:

- **Landing Page:** `https://jhaguar.com`
- **Política de Privacidade:** `https://jhaguar.com/privacidade.html`
- **Termos de Uso:** `https://jhaguar.com/termos.html`
- **Suporte:** `https://jhaguar.com/suporte.html`

## ✅ Checklist antes de Submeter para as Lojas

- [ ] Site publicado e acessível via HTTPS
- [ ] Política de Privacidade acessível e em conformidade com LGPD
- [ ] Termos de Uso acessíveis
- [ ] Página de Suporte com informações de contato
- [ ] Domínio personalizado configurado (opcional mas recomendado)
- [ ] Testar todos os links entre as páginas
- [ ] Verificar responsividade em mobile

## 🔒 Conformidade

### LGPD (Lei Geral de Proteção de Dados)
A Política de Privacidade foi criada seguindo os requisitos da LGPD:
- ✅ Informações sobre coleta de dados
- ✅ Base legal para tratamento
- ✅ Direitos dos titulares
- ✅ Contato do DPO (Encarregado de Proteção de Dados)
- ✅ Período de retenção de dados
- ✅ Medidas de segurança

### App Store (Apple)
Requisitos atendidos:
- ✅ URL de Política de Privacidade
- ✅ URL de Termos de Uso
- ✅ URL de Suporte

### Play Store (Google)
Requisitos atendidos:
- ✅ URL de Política de Privacidade
- ✅ Página de Suporte com informações de contato
- ✅ Informações sobre coleta de dados

## 📧 E-mails Mencionados

Certifique-se de criar estes e-mails no seu domínio:

- `suporte@jhaguar.com` - Suporte geral
- `privacidade@jhaguar.com` - Questões de privacidade
- `dpo@jhaguar.com` - Encarregado de Proteção de Dados
- `juridico@jhaguar.com` - Questões legais
- `parcerias@jhaguar.com` - Oportunidades de parceria
- `imprensa@jhaguar.com` - Contato para imprensa

## 🎨 Personalização

Para personalizar o site:

1. **Cores:** Edite as cores no CSS de cada arquivo HTML
   - Primária: `#667eea`
   - Secundária: `#764ba2`

2. **Conteúdo:** Edite diretamente os arquivos HTML

3. **Logo:** Substitua o emoji 🚗 por uma imagem do logo real

## 🔄 Atualizações

Quando precisar atualizar:

1. Edite os arquivos HTML localmente
2. Commit e push para o GitHub
3. Vercel fará deploy automático (se configurado)
4. OU faça `vercel --prod` manualmente

## ⚠️ Importante

- **NUNCA** commite arquivos `.env` com dados sensíveis
- As páginas HTML são estáticas e seguras para commit
- Atualize a data "Última atualização" quando modificar Privacidade ou Termos
- Mantenha backups dos arquivos HTML

## 📞 Suporte

Para dúvidas sobre o deploy, consulte:
- [Documentação do Vercel](https://vercel.com/docs)
- [Guia de domínios personalizados](https://vercel.com/docs/concepts/projects/custom-domains)
