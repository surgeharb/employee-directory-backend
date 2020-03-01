import { Document } from 'mongoose';

export interface IEmployee extends Document {
  readonly _id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly position?: string;
  readonly department?: string;
  readonly nationality?: string;
  readonly phoneNumber?: number;
  readonly workYears?: number;
  readonly profilePicture?: number;
}
