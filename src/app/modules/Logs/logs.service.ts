import { HttpStatus } from 'http-status-ts';
import AppError from '../../Errors/AppError';
import { InteractionLog } from './logs.model';
import { Client } from '../Client/client.model';
import { TInteractionLog } from './logs.interface';
import { Project } from '../Project/project.model';

const addLogs = async (interactionData: TInteractionLog) => {
  const client = await Client.findById(interactionData.clientId);
  if (!client) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Client not found');
  }
  const project = await Project.findById(interactionData.projectId);
  if (!project) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Project not found');
  }
  const logs = await InteractionLog.create(interactionData);
  return logs;
};

const getAllLogs = async (query: any) => {
  const { userEmail } = query;
  const filter = userEmail ? { userEmail } : {};
  const result = await InteractionLog.find(filter)
    .populate('clientId')
    .populate('projectId');
  return result;
};

export const LogsService = { addLogs, getAllLogs };
