import { InputType, Field, Int } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddEmployeeDto {
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