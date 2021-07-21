import { Resolver, Query, Args } from '@nestjs/graphql';
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
}
