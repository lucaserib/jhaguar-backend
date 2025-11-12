/**
 * Configuração CORS centralizada para HTTP e WebSocket
 *
 * IMPORTANTE: Apps mobile nativos (React Native, Flutter, etc.) não precisam
 * de CORS porque não são browsers. CORS é uma restrição de segurança de browsers.
 *
 * Deep links (jhaguar://) NÃO são origens CORS válidas.
 */

/**
 * Retorna a lista de origens permitidas baseada no ambiente
 */
export function getAllowedOrigins(): string[] | boolean {
  // Em desenvolvimento, aceita qualquer origem
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  // Em produção, usa lista restrita
  const origins = [
    'https://jhaguar.com',
    'https://www.jhaguar.com',
    'https://jhaguar.com.br',
    'https://www.jhaguar.com.br',
    process.env.FRONTEND_URL,
    process.env.MOBILE_APP_URL,
  ].filter(Boolean) as string[]; // Remove valores undefined/null

  return origins;
}

/**
 * Configuração CORS para HTTP (Express/NestJS)
 */
export function getHttpCorsConfig() {
  return {
    origin: getAllowedOrigins(),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,Accept,Origin,X-Requested-With',
  };
}

/**
 * Configuração CORS para WebSocket (Socket.io)
 */
export function getWebSocketCorsConfig() {
  const allowedOrigins = getAllowedOrigins();

  // Socket.io aceita boolean ou objeto
  if (allowedOrigins === true) {
    return { origin: '*' };
  }

  return {
    origin: allowedOrigins,
    credentials: true,
  };
}
