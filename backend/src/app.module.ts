import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { ManagerModule } from './manager/manager.module';

import { AuthModule } from './auth/auth.module';

import { Manager } from './entity/manager.entity';

import { Employee } from './entity/employee.entity';

import { Task } from './entity/task.entity';

import { PusherService } from './pusher/pusher.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST || 'localhost',

      port: parseInt(process.env.DB_PORT) || 5432,

      username: process.env.DB_USERNAME || 'postgres',

      password: process.env.DB_PASSWORD || '495969',

      database: process.env.DB_NAME || 'manager_db',

      entities: [Manager, Employee, Task],

      synchronize: true,
    }),

    JwtModule.register({
      global: true,

      secret: process.env.JWT_SECRET || 'secret',

      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any,
      },
    }),

    ManagerModule,

    AuthModule,
  ],

  providers: [PusherService],
})
export class AppModule {}
