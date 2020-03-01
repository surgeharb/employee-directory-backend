import { ArgsType, Field, Int } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class EditEmployeeDto {
  @Field()
  @IsNotEmpty()
  _id: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  position: string;

  @Field()
  @IsNotEmpty()
  nationality: string;

  @Field({ nullable: true })
  department?: string;

  @Field({ nullable: true })
  profilePicture?: number;

  @Field(type => Int, { nullable: true })
  workYears?: number;

  @Field(type => Int, { nullable: true })
  phoneNumber?: number;
}