import { Document, model, Schema } from 'mongoose';
import { TClient } from './client.interface';

const ClientSchema = new Schema<TClient & Document>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  notes: {
    type: String,
  },
});

export const Client = model<TClient & Document>('Client', ClientSchema);
