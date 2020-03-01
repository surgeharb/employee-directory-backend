import { Schema } from 'mongoose';

export const EmployeesSchema = new Schema({

  firstName: { type: String },
  lastName: { type: String },
  position: { type: String },
  department: { type: String },
  nationality: { type: String },
  profilePicture: { type: Number },
  workYears: { type: Number },
  phoneNumber: { type: Number },

  // Timestamps
  updatedAt: { type: Date, select: false },
  createdAt: { type: Date, select: false },
  __v: { type: Number, select: false },

}, { timestamps: true });