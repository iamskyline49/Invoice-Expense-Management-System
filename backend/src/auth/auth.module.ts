import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Manager } from '../entity/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
