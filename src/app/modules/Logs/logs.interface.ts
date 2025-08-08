import mongoose from 'mongoose';

export interface TInteractionLog {
  date: Date;
  interactionType: 'Call' | 'Meeting' | 'Email';
  notes: string;
  clientId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
}
