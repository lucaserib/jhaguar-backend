# 🚗 API de Corridas - Documentação Completa

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Autenticação](#autenticação)
3. [Fluxo Principal de Corrida](#fluxo-principal-de-corrida)
4. [Endpoints por Módulo](#endpoints-por-módulo)
5. [Integração Frontend](#integração-frontend)
6. [Exemplos Práticos](#exemplos-práticos)

## 🔧 Configuração Inicial

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- Google Maps API Key

### Instalação

```bash
# 1. Clone e configure
git clone [seu-repositorio]
cd backend
chmod +x setup.sh
./setup.sh

# 2. Configure o .env
cp .env.example .env
# Edite as variáveis necessárias

# 3. Configure o banco
npm run prisma:migrate
npm run db:seed:all

# 4. Inicie o servidor
npm run start:dev
```

### Usando Docker (Recomendado)

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar serviços
docker-compose down
```

## 🔐 Autenticação

### Registro de Usuário

```javascript
// POST /auth/register
const registerUser = async (userData) => {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'user@example.com',
      phone: '+5511999999999',
      firstName: 'João',
      lastName: 'Silva',
      password: 'senha123',
      gender: 'MALE',
      userType: 'PASSENGER', // ou 'DRIVER'
    }),
  });

  const { access_token, user } = await response.json();
  return { token: access_token, user };
};
```

### Login

```javascript
// POST /auth/login
const loginUser = async (email, password) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};
```

## 🎯 Fluxo Principal de Corrida

### 1. Buscar Tipos de Corrida Disponíveis

```javascript
// GET /ride-types/available
const getAvailableRideTypes = async (context = {}) => {
  const params = new URLSearchParams({
    includeDelivery: context.isDelivery || false,
    hasPets: context.hasPets || false,
    userGender: context.userGender || 'PREFER_NOT_TO_SAY'
  });

  const response = await fetch(`/ride-types/available?${params}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  return await response.json();
};

// Exemplo de resposta
{
  "success": true,
  "data": [
    {
      "id": "ride-type-1",
      "type": "NORMAL",
      "name": "Normal",
      "description": "Opção econômica e confiável",
      "icon": "car",
      "basePrice": 5.0,
      "pricePerKm": 1.8,
      "minimumPrice": 8.0,
      "availability": {
        "count": 12,
        "averageEta": 6,
        "hasAvailableDrivers": true
      }
    }
  ]
}
```

### 2. Obter Recomendações Inteligentes

```javascript
// POST /maps/smart-recommendations
const getSmartRecommendations = async (origin, destination, context = {}) => {
  const response = await fetch('/maps/smart-recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      origin: { latitude: -23.5505, longitude: -46.6333 },
      destination: { latitude: -23.5614, longitude: -46.6823 },
      context: {
        isDelivery: false,
        hasPets: true,
        prefersFemaleDriver: false,
        scheduledTime: null,
        specialRequirements: null,
      },
    }),
  });

  return await response.json();
};
```

### 3. Calcular Rota e Preços

```javascript
// POST /maps/calculate-route
const calculateRoute = async (origin, destination) => {
  const response = await fetch('/maps/calculate-route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ origin, destination }),
  });

  const { data } = await response.json();
  return {
    distance: data.distance, // metros
    duration: data.duration, // segundos
    polyline: data.polyline, // para desenhar no mapa
  };
};

// POST /ride-types/calculate-price/compare
const comparePrices = async (rideTypeIds, distance, duration) => {
  const response = await fetch('/ride-types/calculate-price/compare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rideTypeIds,
      distance,
      duration,
      surgeMultiplier: 1.2,
      isPremiumTime: false,
    }),
  });

  return await response.json();
};
```

### 4. Preparar Confirmação de Corrida

```javascript
// POST /maps/prepare-ride-confirmation
const prepareRideConfirmation = async (rideData) => {
  const response = await fetch('/maps/prepare-ride-confirmation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      origin: {
        latitude: -23.5505,
        longitude: -46.6333,
        address: 'Rua da República, 123',
      },
      destination: {
        latitude: -23.5614,
        longitude: -46.6823,
        address: 'Av. Paulista, 456',
      },
      rideTypeId: 'ride-type-1',
      estimatedDistance: 5000,
      estimatedDuration: 900,
      selectedDriverId: null, // opcional
      scheduledTime: null, // opcional
      hasPets: false,
      specialRequirements: null,
    }),
  });

  const result = await response.json();

  if (result.success) {
    return {
      confirmationToken: result.data.confirmationToken,
      finalPrice: result.data.pricing.finalPrice,
      driver: result.data.driver,
      estimatedArrival: result.data.driver.estimatedArrival,
      expiresAt: result.data.expiresAt,
    };
  }

  throw new Error(result.message);
};
```

### 5. Criar Corrida

```javascript
// POST /rides
const createRide = async (confirmationData, confirmationToken) => {
  const response = await fetch('/rides', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...confirmationData,
      confirmationToken,
    }),
  });

  const result = await response.json();

  if (result.success) {
    return {
      rideId: result.data.rideId,
      status: result.data.status,
      driver: result.data.driver,
      pricing: result.data.pricing,
      estimatedArrival: result.data.estimatedArrival,
    };
  }

  throw new Error(result.message);
};
```

### 6. Acompanhar Status da Corrida

```javascript
// GET /rides/my
const getMyRides = async (filters = {}) => {
  const params = new URLSearchParams({
    status: filters.status || '',
    limit: filters.limit || 20,
    offset: filters.offset || 0,
  });

  const response = await fetch(`/rides/my?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};

// GET /rides/:id (para uma corrida específica)
const getRideDetails = async (rideId) => {
  const response = await fetch(`/rides/${rideId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};
```

## 📱 Implementação Frontend React Native

### Hook Personalizado para Corridas

```typescript
// hooks/useRideService.ts
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface RideService {
  availableTypes: RideType[];
  isLoading: boolean;
  createRide: (data: RideData) => Promise<Ride>;
  getRecommendations: (
    origin: Location,
    destination: Location,
  ) => Promise<Recommendations>;
}

export const useRideService = (): RideService => {
  const { token } = useAuth();
  const [availableTypes, setAvailableTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  };

  const loadAvailableTypes = async (context = {}) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        includeDelivery: String(context.isDelivery || false),
        hasPets: String(context.hasPets || false),
      });

      const data = await apiCall(`/ride-types/available?${params}`);
      setAvailableTypes(data);
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async (origin, destination, context = {}) => {
    return await apiCall('/maps/smart-recommendations', {
      method: 'POST',
      body: JSON.stringify({ origin, destination, context }),
    });
  };

  const createRide = async (rideData) => {
    // 1. Preparar confirmação
    const confirmation = await apiCall('/maps/prepare-ride-confirmation', {
      method: 'POST',
      body: JSON.stringify(rideData),
    });

    // 2. Criar corrida
    const ride = await apiCall('/rides', {
      method: 'POST',
      body: JSON.stringify({
        ...rideData,
        confirmationToken: confirmation.confirmationToken,
      }),
    });

    return ride;
  };

  useEffect(() => {
    loadAvailableTypes();
  }, []);

  return {
    availableTypes,
    isLoading,
    createRide,
    getRecommendations,
  };
};
```

### Componente de Seleção de Tipo de Corrida

```typescript
// components/RideTypeSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { RideType } from '../types';

interface Props {
  rideTypes: RideType[];
  selectedType: string | null;
  onSelect: (typeId: string) => void;
  context?: {
    hasPets?: boolean;
    isDelivery?: boolean;
  };
}

export const RideTypeSelector: React.FC<Props> = ({
  rideTypes,
  selectedType,
  onSelect,
  context = {}
}) => {
  const renderRideType = ({ item }: { item: RideType }) => {
    const isSelected = item.id === selectedType;
    const isAvailable = item.availability?.hasAvailableDrivers;

    return (
      <TouchableOpacity
        className={`p-4 border rounded-lg mb-2 ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        } ${!isAvailable ? 'opacity-50' : ''}`}
        onPress={() => isAvailable && onSelect(item.id)}
        disabled={!isAvailable}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-medium">{item.name}</Text>
              {item.contextualInfo?.highlights?.map(highlight => (
                <View key={highlight} className="ml-2 px-2 py-1 bg-green-100 rounded">
                  <Text className="text-xs text-green-800">{highlight}</Text>
                </View>
              ))}
            </View>

            <Text className="text-gray-600 mt-1">{item.description}</Text>

            <View className="flex-row items-center mt-2">
              <Text className="text-lg font-bold text-green-600">
                R$ {item.estimatedPrice?.toFixed(2) || `${item.minimumPrice.toFixed(2)}+`}
              </Text>
              <Text className="text-gray-500 ml-2">
                • {item.availability?.averageEta || 8} min
              </Text>
              <Text className="text-gray-500 ml-2">
                • {item.availability?.count || 0} disponíveis
              </Text>
            </View>

            {item.contextualInfo?.warnings?.map(warning => (
              <Text key={warning} className="text-xs text-amber-600 mt-1">
                ⚠️ {warning}
              </Text>
            ))}
          </View>

          {isSelected && (
            <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs">✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Filtrar e ordenar tipos baseado no contexto
  const filteredTypes = rideTypes
    .filter(type => {
      if (context.isDelivery && !type.isDeliveryOnly) return false;
      if (!context.isDelivery && type.isDeliveryOnly) return false;
      return true;
    })
    .sort((a, b) => {
      // Priorizar tipos recomendados
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;

      // Depois por disponibilidade
      const aAvailable = a.availability?.hasAvailableDrivers ? 1 : 0;
      const bAvailable = b.availability?.hasAvailableDrivers ? 1 : 0;
      if (aAvailable !== bAvailable) return bAvailable - aAvailable;

      // Por fim por prioridade
      return (a.priority || 0) - (b.priority || 0);
    });

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Escolha o tipo de corrida</Text>

      <FlatList
        data={filteredTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderRideType}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
```

### Tela de Confirmação de Corrida

```typescript
// screens/RideConfirmationScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRideService } from '../hooks/useRideService';

export const RideConfirmationScreen = ({ route, navigation }) => {
  const { origin, destination, selectedRideType } = route.params;
  const { createRide } = useRideService();
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    prepareConfirmation();
  }, []);

  const prepareConfirmation = async () => {
    try {
      const response = await fetch('/maps/prepare-ride-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          origin,
          destination,
          rideTypeId: selectedRideType.id,
          estimatedDistance: route.params.distance,
          estimatedDuration: route.params.duration,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setConfirmation(result.data);
      } else {
        Alert.alert('Erro', result.message);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao preparar confirmação');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRide = async () => {
    if (!confirmation) return;

    setIsLoading(true);
    try {
      const ride = await createRide({
        origin,
        destination,
        rideTypeId: selectedRideType.id,
        estimatedDistance: route.params.distance,
        estimatedDuration: route.params.duration,
        confirmationToken: confirmation.confirmationToken,
      });

      navigation.navigate('RideTracking', { rideId: ride.rideId });
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !confirmation) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Preparando corrida...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Mapa com rota */}
      <View className="flex-1">
        {/* Implementar MapView aqui */}
      </View>

      {/* Detalhes da corrida */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold">{selectedRideType.name}</Text>
          <Text className="text-2xl font-bold text-green-600">
            R$ {confirmation.pricing.finalPrice.toFixed(2)}
          </Text>
        </View>

        {/* Informações do motorista */}
        {confirmation.driver && (
          <View className="flex-row items-center mb-4 p-3 bg-gray-50 rounded-lg">
            <View className="flex-1">
              <Text className="font-medium">{confirmation.driver.name}</Text>
              <Text className="text-gray-600">
                ⭐ {confirmation.driver.rating.toFixed(1)} • {confirmation.driver.totalRides} corridas
              </Text>
              <Text className="text-sm text-gray-600">
                {confirmation.driver.vehicle.model} {confirmation.driver.vehicle.color}
              </Text>
            </View>
            <View className="items-end">
              <Text className="font-medium">{confirmation.driver.estimatedArrival} min</Text>
              <Text className="text-gray-500 text-sm">chegada</Text>
            </View>
          </View>
        )}

        {/* Detalhes da rota */}
        <View className="flex-row justify-between mb-6">
          <View className="flex-1">
            <Text className="text-gray-500">Distância</Text>
            <Text className="font-medium">
              {(route.params.distance / 1000).toFixed(1)} km
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-500">Tempo estimado</Text>
            <Text className="font-medium">
              {Math.round(route.params.duration / 60)} min
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-gray-500">Surge</Text>
            <Text className="font-medium">
              {confirmation.pricing.surgeMultiplier > 1
                ? `${confirmation.pricing.surgeMultiplier.toFixed(1)}x`
                : 'Normal'
              }
            </Text>
          </View>
        </View>

        {/* Botão de confirmação */}
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={handleConfirmRide}
          disabled={isLoading}
        >
          <Text className="text-white font-bold text-lg">
            {isLoading ? 'Confirmando...' : 'Confirmar Corrida'}
          </Text>
        </TouchableOpacity>

        {/* Botão de cancelar */}
        <TouchableOpacity
          className="py-3 items-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-gray-600">Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

## 🧪 Testando a API

### Usando cURL

```bash
# 1. Registrar usuário
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+5511999999999",
    "firstName": "Teste",
    "lastName": "Usuário",
    "password": "senha123",
    "gender": "MALE",
    "userType": "PASSENGER"
  }'

# 2. Fazer login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "senha123"
  }'

# 3. Buscar tipos disponíveis
curl -X GET "http://localhost:3000/ride-types/available" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# 4. Obter recomendações
curl -X POST http://localhost:3000/maps/smart-recommendations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "origin": {"latitude": -23.5505, "longitude": -46.6333},
    "destination": {"latitude": -23.5614, "longitude": -46.6823},
    "context": {"hasPets": false}
  }'
```

## 🚀 Deploy e Produção

### Variáveis de Ambiente para Produção

```bash
# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
JWT_SECRET="jwt-super-seguro-para-producao"
GOOGLE_API_KEY="sua-api-key-de-producao"
NODE_ENV="production"
PORT=3000
```

### Deploy com Docker

```bash
# Build da imagem
docker build -t ride-app-backend .

# Executar em produção
docker run -d \
  --name ride-app \
  -p 3000:3000 \
  --env-file .env.production \
  ride-app-backend
```

## 📊 Monitoramento

A API inclui endpoints de monitoramento:

- `GET /` - Health check básico
- `GET /api-docs` - Documentação Swagger
- `GET /ride-types/test` - Teste do módulo de tipos
- `GET /maps/test` - Teste do módulo de mapas
- `GET /rides/test` - Teste do módulo de corridas

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**

   ```bash
   npm run prisma:migrate
   npm run db:seed:all
   ```

2. **Token JWT inválido**

   - Verificar se JWT_SECRET está configurado
   - Token pode ter expirado (7 dias)

3. **Google Maps API não funciona**

   - Verificar se GOOGLE_API_KEY está configurado
   - Verificar se as APIs estão habilitadas no console do Google

4. **Motoristas não aparecem**
   - Executar: `npm run db:seed:fernandopolis`
   - Verificar se há motoristas online no banco

## 📞 Suporte

Para dúvidas sobre a API:

1. Consulte a documentação Swagger em `/api-docs`
2. Verifique os logs do servidor
3. Use os endpoints de teste para validar o funcionamento

---

Esta documentação cobre o uso completo da API. Para implementações específicas ou dúvidas técnicas, consulte o código fonte ou a documentação Swagger.
