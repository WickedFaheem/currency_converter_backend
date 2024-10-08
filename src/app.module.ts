import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyModule } from './components/currency/currency.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mssql',
          host: '209.126.2.122',
          port: 1433,
          username: 'sa',
          password: 'D3v$erverC0n24@',
          database: 'Currency_Db',
          logging: false,
          encrypt: true,
          requestTimeout: 30000000,
        };
      },
      inject: [ConfigService],
    }),
    CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
