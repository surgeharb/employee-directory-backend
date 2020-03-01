import { Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  position: string;
  department: string;
  nationality: string;
  profilePicture: string;
  workYears: number;
  birthdate: number;
  idNumber: number;
}
