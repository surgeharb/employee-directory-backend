import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EMPLOYEES } from '@schemas';
import { Model } from 'mongoose';

import { Employee } from './dtos/employee.dto';
import { IEmployee } from './interfaces/employee.interface';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectModel(EMPLOYEES.name) private readonly employeesModel: Model<IEmployee>,
  ) { }

  public create(employee: Employee): Promise<IEmployee> {
    return this.employeesModel.create(employee);
  }

  public findById(employeeId: string): Promise<Employee> {
    return this.employeesModel.findById(employeeId).lean().exec();
  }

  public findOneAndUpdate(match: any, update: Employee): Promise<IEmployee> {
    return this.employeesModel.findOneAndUpdate(match, update, { new: true }).lean().exec();
  }

  public findByIdAndRemove(employeeId: string): Promise<IEmployee> {
    return this.employeesModel.findByIdAndRemove(employeeId).lean().exec();
  }

  public async searchBy(type: string, text: string): Promise<IEmployee[]> {
    const allowedTypes = ['name', 'department', 'position', 'nationality'];

    // discard request if filter "type" is not as expected
    if (!allowedTypes.includes(type)) { return []; }

    return this.employeesModel.find({ [type]: new RegExp(`^${text}`, 'i') }).lean().exec();
  }

}
