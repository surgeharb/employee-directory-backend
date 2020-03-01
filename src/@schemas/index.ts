import { UsersSchema } from '../users/schemas/users.schema';
import { EmployeesSchema } from '../employees/schemas/employees.schema';

export const USERS = { name: 'Users', schema: UsersSchema };
export const EMPLOYEES = { name: 'Employees', schema: EmployeesSchema };