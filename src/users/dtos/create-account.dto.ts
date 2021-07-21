import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from '../entities/User.entity';

@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
