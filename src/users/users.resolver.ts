import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { FindByEmailInput, FindByEmailOutput } from './dtos/find-by-email.dto';
import { User } from './entities/User.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  isLogin() {
    return true;
  }

  @Query(() => FindByEmailOutput)
  async findByEmail(
    @Args() findByEmailInput: FindByEmailInput,
  ): Promise<FindByEmailOutput> {
    return await this.usersService.findByEmail(findByEmailInput);
  }

  @Mutation(() => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return await this.usersService.createAccount(createAccountInput);
  }
}
