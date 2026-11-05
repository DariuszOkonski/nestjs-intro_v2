import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { appConfigSchema } from './config/config.types';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed-config.service';
import { DummyService } from './dummy/dummy.service';
import { LoggerService } from './logger/logger.service';
import { MessageFormatterService } from './message-formatter/message-formatter.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('database'),
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig],
      validationSchema: appConfigSchema,
      // validationOptions: {
      //   allowUnknown: false,
      // },
      validationOptions: {},
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DummyService,
    MessageFormatterService,
    LoggerService,
    {
      provide: TypedConfigService,
      useExisting: ConfigService,
    },
  ],
})
export class AppModule {}
