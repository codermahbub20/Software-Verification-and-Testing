import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { HttpStatus } from 'http-status-ts';
import sendResponse from '../../utils/sendResponse';
import CatchAsync from '../../utils/CatchAsync';

const addProjectToClient = CatchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.addProjectToClient(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Client Project add successfully',
    data: result,
  });
});

const getAllProjects = CatchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ProjectService.getAllProjects(query);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: ' Project retraived successfully',
    data: result,
  });
});

const updateProject = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ProjectService.updateProjectById(id, updateData);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProjectById = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProjectService.deleteProjectById(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  });
});

export const ProjectController = {
  addProjectToClient,
  getAllProjects,
  updateProject,
  deleteProjectById,
};
