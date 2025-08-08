import { Project } from './project.model';
import { TProject } from './project.interface';
import { Client } from '../Client/client.model';
import AppError from '../../Errors/AppError';
import { HttpStatus } from 'http-status-ts';

const addProjectToClient = async (projectData: TProject) => {
  const client = await Client.findById(projectData.clientId);
  if (!client) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Client not found');
  }
  const project = await Project.create(projectData);
  return project;
};

const getAllProjects = async (query: any) => {
  const { userEmail } = query;
  const filter = userEmail ? { userEmail } : {};
  const projects = await Project.find(filter).populate('clientId');
  return projects;
};

const updateProjectById = async (id: string, updateData: Partial<TProject>) => {
  const result = await Project.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

const deleteProjectById = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectService = {
  addProjectToClient,
  getAllProjects,
  updateProjectById,
  deleteProjectById,
};
