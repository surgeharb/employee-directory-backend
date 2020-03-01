import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginReq {
  @Field(type => String)
  @IsNotEmpty()
  email: string;

  @Field(type => String)
  @IsNotEmpty()
  password: string;
}