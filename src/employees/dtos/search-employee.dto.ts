import { Field, ArgsType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class EmployeeSearchDto {
  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  text: string;
}