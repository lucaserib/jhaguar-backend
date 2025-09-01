/**
 * CORREÇÃO: Utilitários matemáticos centralizados
 * Substitui duplicações de cálculos matemáticos em maps.service.ts e outros arquivos
 * Implementação otimizada de cálculos geoespaciais
 */

/**
 * Calcula a distância entre duas coordenadas usando a fórmula de Haversine
 * @param lat1 Latitude do ponto 1
 * @param lng1 Longitude do ponto 1  
 * @param lat2 Latitude do ponto 2
 * @param lng2 Longitude do ponto 2
 * @returns Distância em quilômetros
 */
export function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em km
}

/**
 * Converte graus para radianos
 * @param deg Valor em graus
 * @returns Valor em radianos
 */
export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Converte radianos para graus
 * @param rad Valor em radianos
 * @returns Valor em graus
 */
export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

/**
 * Calcula o bearing (direção) entre dois pontos
 * @param lat1 Latitude do ponto de origem
 * @param lng1 Longitude do ponto de origem
 * @param lat2 Latitude do ponto de destino
 * @param lng2 Longitude do ponto de destino
 * @returns Bearing em graus (0-360)
 */
export function calculateBearing(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLng = degToRad(lng2 - lng1);
  const lat1Rad = degToRad(lat1);
  const lat2Rad = degToRad(lat2);

  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

  const bearing = radToDeg(Math.atan2(y, x));
  return (bearing + 360) % 360; // Normalizar para 0-360
}

/**
 * Calcula um ponto a uma determinada distância e bearing de um ponto inicial
 * @param lat Latitude do ponto inicial
 * @param lng Longitude do ponto inicial
 * @param distance Distância em quilômetros
 * @param bearing Direção em graus
 * @returns Nova coordenada {latitude, longitude}
 */
export function calculateDestinationPoint(
  lat: number,
  lng: number,
  distance: number,
  bearing: number,
): { latitude: number; longitude: number } {
  const R = 6371; // Raio da Terra em km
  const bearingRad = degToRad(bearing);
  const latRad = degToRad(lat);
  const lngRad = degToRad(lng);

  const destLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(distance / R) +
    Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearingRad)
  );

  const destLngRad = lngRad + Math.atan2(
    Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(latRad),
    Math.cos(distance / R) - Math.sin(latRad) * Math.sin(destLatRad)
  );

  return {
    latitude: radToDeg(destLatRad),
    longitude: radToDeg(destLngRad),
  };
}

/**
 * Valida se uma coordenada está dentro dos limites válidos
 * @param latitude Latitude a validar
 * @param longitude Longitude a validar  
 * @returns true se válida, false caso contrário
 */
export function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    latitude >= -90 && 
    latitude <= 90 && 
    longitude >= -180 && 
    longitude <= 180 &&
    !isNaN(latitude) &&
    !isNaN(longitude)
  );
}

/**
 * Calcula a área de um polígono definido por coordenadas
 * @param coordinates Array de coordenadas [{latitude, longitude}]
 * @returns Área em quilômetros quadrados
 */
export function calculatePolygonArea(
  coordinates: { latitude: number; longitude: number }[]
): number {
  if (coordinates.length < 3) {
    return 0;
  }

  const R = 6371; // Raio da Terra em km
  let area = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const j = (i + 1) % coordinates.length;
    const xi = degToRad(coordinates[i].longitude);
    const yi = degToRad(coordinates[i].latitude);
    const xj = degToRad(coordinates[j].longitude);
    const yj = degToRad(coordinates[j].latitude);

    area += (xj - xi) * (2 + Math.sin(yi) + Math.sin(yj));
  }

  area = Math.abs(area) * R * R / 2;
  return area;
}

/**
 * Encontra o ponto mais próximo de um array de coordenadas
 * @param targetLat Latitude do ponto de referência
 * @param targetLng Longitude do ponto de referência
 * @param points Array de pontos para comparar
 * @returns Ponto mais próximo com distância
 */
export function findNearestPoint(
  targetLat: number,
  targetLng: number,
  points: { latitude: number; longitude: number; [key: string]: any }[]
): { point: any; distance: number } | null {
  if (points.length === 0) {
    return null;
  }

  let nearest = points[0];
  let minDistance = calculateHaversineDistance(
    targetLat,
    targetLng,
    nearest.latitude,
    nearest.longitude
  );

  for (let i = 1; i < points.length; i++) {
    const distance = calculateHaversineDistance(
      targetLat,
      targetLng,
      points[i].latitude,
      points[i].longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = points[i];
    }
  }

  return { point: nearest, distance: minDistance };
}