import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
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

  async createAccount({
    email,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'Already exists email' };
      }
      await this.users.save(this.users.create({ email, password }));
    } catch (error) {
      return { ok: false, error };
    }
  }
}
