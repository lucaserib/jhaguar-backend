import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';

export enum StatsPeriod {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
}

export class DriverStatsDto {
  @ApiProperty({
    description: 'Período para consulta das estatísticas',
    enum: StatsPeriod,
    example: StatsPeriod.TODAY,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatsPeriod)
  period?: StatsPeriod;
}

export class DriverStatsResponseDto {
  @ApiProperty({
    description: 'Estatísticas de ganhos',
    example: {
      total: 150.5,
      count: 8,
      average: 18.81,
    },
  })
  earnings: {
    total: number;
    count: number;
    average: number;
  };

  @ApiProperty({
    description: 'Estatísticas de corridas',
    example: {
      completed: 8,
      cancelled: 1,
      acceptance_rate: 89.5,
    },
  })
  rides: {
    completed: number;
    cancelled: number;
    acceptance_rate: number;
  };

  @ApiProperty({
    description: 'Estatísticas de avaliações',
    example: {
      average: 4.7,
      count: 8,
    },
  })
  Rating: {
    average: number;
    count: number;
  };

  @ApiProperty({
    description: 'Estatísticas de distância',
    example: {
      total_km: 145.8,
      average_per_ride: 18.2,
    },
  })
  distance: {
    total_km: number;
    average_per_ride: number;
  };

  @ApiProperty({
    description: 'Tempo online em horas',
    example: {
      total_hours: 8.5,
      productive_hours: 6.2,
    },
  })
  onlineTime: {
    total_hours: number;
    productive_hours: number;
  };
}
