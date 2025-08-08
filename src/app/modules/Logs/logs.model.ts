import mongoose, { Schema } from 'mongoose';
import { TInteractionLog } from './logs.interface';

const InteractionLogSchema = new Schema<TInteractionLog>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  interactionType: {
    type: String,
    enum: ['Call', 'Meeting', 'Email'],
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export const InteractionLog = mongoose.model<TInteractionLog>(
  'InteractionLog',
  InteractionLogSchema,
);
