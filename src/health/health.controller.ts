import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheckResult,
  HealthCheck,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.checkServer();
  }

  @Get('server')
  @HealthCheck()
  checkServer(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => ({
        'nest-server': { status: 'up' },
      }),
    ]);
  }

  @Get('db')
  @HealthCheck()
  checkDb(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.db.pingCheck('postgres'),
    ]);
  }
}
