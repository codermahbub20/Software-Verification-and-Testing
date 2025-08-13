import mongoose, { Schema, Document, Types } from 'mongoose';
import { TProject } from './project.interface';

const ProjectSchema = new Schema<TProject & Document>({
  title: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Pending'],
    required: true,
  },
  name: {
    type: String,
    required: false, // Optional field for project name
  },
  clientId: {
    type: Types.ObjectId ,
    ref: 'Client',
  } , // Reference to Client
});

export const Project = mongoose.model<TProject & Document>(
  'Project',
  ProjectSchema,
);
