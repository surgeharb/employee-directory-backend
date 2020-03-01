import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { GqlAuthGuard } from '@core/utils/gql-auth.guard';
import { EmployeesService } from './employees.service';
import { UseGuards } from '@nestjs/common';

import { Employee } from './dtos/employee.dto';
import { AddEmployeeDto } from "./dtos/add-employee.dto";
import { EmployeeSearchDto } from './dtos/search-employee.dto';

@Resolver('Employees')
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
  ) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Employee)
  async getEmployee(
    @Args({ name: 'id', type: () => String }) id: string
  ) {
    return this.employeesService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Employee)
  async addEmployee(
    @Args('employee') addEmployeeDto: AddEmployeeDto
  ) {
    return this.employeesService.create(addEmployeeDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Employee)
  async removeEmployee(
    @Args({ name: 'id', type: () => String }) id: string
  ) {
    return this.employeesService.findByIdAndRemove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Employee)
  async editEmployee(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args('employee') addEmployeeDto: AddEmployeeDto
  ) {
    return this.employeesService.findOneAndUpdate(id, addEmployeeDto);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Employee])
  async searchEmployees(
    @Args() employeeSearchDto: EmployeeSearchDto
  ) {
    const { type, text } = employeeSearchDto;
    return this.employeesService.searchBy(type, text);
  }
}
