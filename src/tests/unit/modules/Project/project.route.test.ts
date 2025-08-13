import request from 'supertest';
import express, { Express, NextFunction, Request, Response } from 'express';

import { ProjectController } from '../../../../../src/app/modules/Project/project.controller';
import { USER_ROLE } from '../../../../../src/app/modules/User/user.constant';
import { projectRoutes } from '../../../../app/modules/Project/project.route';

// Mock auth middleware
jest.mock('../../../../../src/app/middlewares/auth', () => jest.fn(() => (req:Request, res:Response, next:NextFunction) => next()));

// Mock controller methods
jest.mock('../../../../../src/app/modules/Project/project.controller', () => ({
  ProjectController: {
    addProjectToClient: jest.fn((req, res) => res.status(201).json({ success: true })),
    getAllProjects: jest.fn((req, res) => res.status(200).json({ success: true })),
    updateProject: jest.fn((req, res) => res.status(200).json({ success: true })),
    deleteProjectById: jest.fn((req, res) => res.status(200).json({ success: true })),
  },
}));

describe('Project Routes', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', projectRoutes); // Mount your routes
  });

  it('POST /api/projects should call addProjectToClient', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ name: 'Test Project' });

    expect(res.status).toBe(201);
    expect(ProjectController.addProjectToClient).toHaveBeenCalled();
  });

  it('GET /api/projects should call getAllProjects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(ProjectController.getAllProjects).toHaveBeenCalled();
  });

  it('PATCH /api/projects/:id should call updateProject', async () => {
    const res = await request(app)
      .patch('/api/projects/123')
      .send({ name: 'Updated Project' });

    expect(res.status).toBe(200);
    expect(ProjectController.updateProject).toHaveBeenCalled();
  });

  it('DELETE /api/projects/:id should call deleteProjectById', async () => {
    const res = await request(app).delete('/api/projects/123');
    expect(res.status).toBe(200);
    expect(ProjectController.deleteProjectById).toHaveBeenCalled();
  });
});
