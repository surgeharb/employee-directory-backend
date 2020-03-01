import { Schema } from 'mongoose';

export const EmployeesSchema = new Schema({

  name: { type: String },
  position: { type: String },
  department: { type: String },
  nationality: { type: String },
  profilePicture: { type: String },
  workYears: { type: Number },
  birthdate: { type: Number },
  idNumber: { type: Number },

  // Timestamps
  updatedAt: { type: Date, select: false },
  createdAt: { type: Date, select: false },
  __v: { type: Number, select: false },

}, { timestamps: true });