import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EMPLOYEES } from '@schemas';

const Schemas = [EMPLOYEES];

@Module({
  imports: [MongooseModule.forFeature(Schemas)],
  providers: [EmployeesService, EmployeesResolver],
  exports: [EmployeesService],
})
export class EmployeesModule {}
