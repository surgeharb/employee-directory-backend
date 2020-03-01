import { Field, ObjectType, Int } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Employee {
  @Field()
  _id?: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  position: string;

  @Field()
  @IsNotEmpty()
  nationality: string;

  @Field({ nullable: true })
  department?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field(type => Int, { nullable: true })
  workYears?: number;

  @Field(type => Int, { nullable: true })
  birthdate?: number;

  @Field(type => Int, { nullable: true })
  idNumber?: number;
}