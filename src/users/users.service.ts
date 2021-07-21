import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindByEmailInput, FindByEmailOutput } from './dtos/find-by-email.dto';
import { User } from './entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findByEmail({ email }: FindByEmailInput): Promise<FindByEmailOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return { ok: false, error: 'can not found user' };
      }
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'can not found user' };
    }
  }
}
