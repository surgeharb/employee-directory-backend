import { Field, ObjectType } from 'type-graphql';

import { User } from '../../users/dtos/user.dto';

@ObjectType()
export class Login {
  @Field(type => User)
  user: User;

  @Field(type => String)
  token: string;
}