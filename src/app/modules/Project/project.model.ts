import mongoose, { Schema, Document } from 'mongoose';
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
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  }, // Reference to Client
});

export const Project = mongoose.model<TProject & Document>(
  'Project',
  ProjectSchema,
);
