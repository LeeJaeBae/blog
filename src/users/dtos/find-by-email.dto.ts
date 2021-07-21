import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from '../entities/User.entity';

@ArgsType()
export class FindByEmailInput {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class FindByEmailOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
