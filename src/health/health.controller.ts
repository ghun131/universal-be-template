import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheckResult,
  HealthCheck,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get('server')
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => ({
        'nest-server': { status: 'up' },
      }),
    ]);
  }
}
