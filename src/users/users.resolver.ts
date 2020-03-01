import { User } from "./dtos/user.dto";
import { UsersService } from "./users.service";
import { Resolver, Args, Query } from "@nestjs/graphql";
import { GqlAuthGuard } from "@core/utils/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { Employee } from "~src/employees/dtos/employee.dto";

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async getUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.usersService.findById(id);
  }
}