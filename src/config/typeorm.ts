import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: process.env.DB_TYPE ?? 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
