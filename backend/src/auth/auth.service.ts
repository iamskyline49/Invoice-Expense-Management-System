import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Manager } from '../entity/manager.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const manager = await this.managerRepository.findOne({ where: { id: 1 } });

    if (!manager) {
      throw new UnauthorizedException(
        'No manager profile found. Call PUT /manager/profile first.',
      );
    }

    if (manager.username.toLowerCase() !== username.toLowerCase()) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, manager.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: manager.id, username: manager.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      manager: { id: manager.id, username: manager.username },
    };
  }
}
