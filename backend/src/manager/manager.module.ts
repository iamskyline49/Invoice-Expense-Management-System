import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { Employee } from '../entity/employee.entity';
import { Task } from '../entity/task.entity';
import { Manager } from '../entity/manager.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PusherService } from '../pusher/pusher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Task, Manager])],
  controllers: [ManagerController],
  providers: [ManagerService, JwtAuthGuard, PusherService, PusherService],
})
export class ManagerModule {}
