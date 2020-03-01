import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { GqlAuthGuard } from '@core/utils/gql-auth.guard';
import { EmployeesService } from './employees.service';
import { UseGuards } from '@nestjs/common';
import { Int } from "type-graphql";

import { Employee } from './dtos/employee.dto';
import { AddEmployeeDto } from "./dtos/add-employee.dto";
import { EditEmployeeDto } from "./dtos/edit-employee.dto";
import { EmployeeSearchDto } from './dtos/search-employee.dto';

@Resolver('Employees')
// @UseGuards(GqlAuthGuard)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
  ) { }

  @Query(returns => Int)
  async countEmployees() {
    return this.employeesService.countAll();
  }

  @Query(returns => [Employee])
  async getEmployees(
    @Args({ name: 'page', type: () => Int }) page: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number
  ) {
    return this.employeesService.findAll(page, pageSize);
  }

  @Query(returns => Employee)
  async getEmployee(
    @Args({ name: 'id', type: () => String }) id: string
  ) {
    return id ? this.employeesService.findById(id) : {};
  }

  @Mutation(returns => Employee)
  async addEmployee(
    @Args() addEmployeeDto: AddEmployeeDto
  ) {
    return this.employeesService.create(addEmployeeDto);
  }

  @Mutation(returns => Employee)
  async removeEmployee(
    @Args({ name: 'id', type: () => String }) id: string
  ) {
    return this.employeesService.findByIdAndRemove(id);
  }

  @Mutation(returns => Employee)
  async editEmployee(
    @Args() editEmployeeDto: EditEmployeeDto,
  ) {
    const id = editEmployeeDto._id;
    console.log("TCL: EmployeesResolver -> id", id)
    delete editEmployeeDto._id;

    console.log("TCL: EmployeesResolver -> editEmployeeDto", editEmployeeDto)
    return this.employeesService.findOneAndUpdate(id, editEmployeeDto);
  }

  @Query(returns => [Employee])
  async searchEmployees(
    @Args() employeeSearchDto: EmployeeSearchDto
  ) {
    const { type, text } = employeeSearchDto;
    return this.employeesService.searchBy(type, text);
  }
}
