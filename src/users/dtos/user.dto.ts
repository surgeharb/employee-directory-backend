import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}