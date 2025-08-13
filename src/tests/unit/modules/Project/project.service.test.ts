import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { HttpStatus } from 'http-status-ts';
import { Client } from '../../../../app/modules/Client/client.model';
import { Project } from '../../../../app/modules/Project/project.model';
import { TProject } from '../../../../app/modules/Project/project.interface';
import { ProjectService } from '../../../../app/modules/Project/project.service';
import AppError from '../../../../app/Errors/AppError';

describe('ProjectService', () => {
  let mongoServer: MongoMemoryServer;
  let clientId: string;

  // Start in-memory MongoDB and create a client before tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Add all required fields according to your Client schema
    const client = await Client.create({ 
      name: 'Test Client', 
      email: 'client@example.com',
      phone: '0123456789',       // REQUIRED field
      userEmail: 'user@example.com' // REQUIRED field
    });
    clientId = client._id.toString();
  });

  // Stop MongoDB after all tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Clear Projects after each test
  afterEach(async () => {
    await Project.deleteMany({});
  });

  // 1. Test creating a project
  it('should create a project for an existing client', async () => {
    const payload: TProject = {
      name: 'New Project',
      title: 'Project Title',
      description: 'Project Description',
      clientId,
      userEmail: 'user@example.com',
      budget: 1000,
      deadline: new Date(),
      status: 'Pending', 
    };

    const project = await ProjectService.addProjectToClient(payload);

    expect(project._id).toBeDefined();
   expect(project.name).toBe(payload.name);
    expect(project.clientId!.toString()).toBe(clientId);
  });

  // 2. Test error if client does not exist
  it('should throw error if client does not exist', async () => {
    const payload: TProject = {
      name: 'Fail Project',
      title: 'Fail Title',
      description: 'Project Description',
      clientId: new mongoose.Types.ObjectId().toString(), // non-existing client
      userEmail: 'user@example.com',
      budget: 500,
      deadline: new Date(),
      status: 'Pending',
    };

    await expect(ProjectService.addProjectToClient(payload))
      .rejects
      .toThrow(AppError);

    await expect(ProjectService.addProjectToClient(payload))
      .rejects
      .toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
  });

  // 3. Test getting all projects
  it('should get all projects', async () => {
    const payload1: TProject = {
      name: 'Project 1',
      title: 'Title 1',
      description: 'Desc 1',
      clientId,
      userEmail: 'user1@example.com',
      budget: 1000,
      deadline: new Date(),
      status: 'Pending',
    };
    const payload2: TProject = {
      name: 'Project 2',
      title: 'Title 2',
      description: 'Desc 2',
      clientId,
      userEmail: 'user2@example.com',
      budget: 2000,
      deadline: new Date(),
      status: 'Completed',
    };

    await ProjectService.addProjectToClient(payload1);
    await ProjectService.addProjectToClient(payload2);

    const projects = await ProjectService.getAllProjects({});
    expect(projects.length).toBe(2);
  });

  // 4. Test getting projects filtered by userEmail
  it('should get projects filtered by userEmail', async () => {
    const payload1: TProject = {
      name: 'Project 1',
      title: 'Title 1',
      description: 'Desc 1',
      clientId,
      userEmail: 'filter@example.com',
      budget: 1500,
      deadline: new Date(),
      status: 'Pending',
    };
    const payload2: TProject = {
      name: 'Project 2',
      title: 'Title 2',
      description: 'Desc 2',
      clientId,
      userEmail: 'other@example.com',
      budget: 2000,
      deadline: new Date(),
      status: 'Completed',
    };

    await ProjectService.addProjectToClient(payload1);
    await ProjectService.addProjectToClient(payload2);

    const projects = await ProjectService.getAllProjects({ userEmail: 'filter@example.com' });
    expect(projects.length).toBe(1);
    expect(projects[0].userEmail).toBe('filter@example.com');
  });

  // 5. Test updating a project
  it('should update a project by ID', async () => {
    const payload: TProject = {
      name: 'Old Name',
      title: 'Old Title',
      description: 'Old Desc',
      clientId,
      userEmail: 'user@example.com',
      budget: 1000,
      deadline: new Date(),
      status: 'Pending',
    };

    const project = await ProjectService.addProjectToClient(payload);

    const updated = await ProjectService.updateProjectById(project._id.toString(), {
      name: 'Updated Name',
      status: 'Completed',
    });

    expect(updated).not.toBeNull();
    expect(updated!.name).toBe('Updated Name');
    expect(updated!.status).toBe('Completed');
  });

  // 6. Test deleting a project
  it('should delete a project by ID', async () => {
    const payload: TProject = {
      name: 'Delete Project',
      title: 'Delete Title',
      description: 'To be deleted',
      clientId,
      userEmail: 'user@example.com',
      budget: 1200,
      deadline: new Date(),
      status: 'Pending',
    };

    const project = await ProjectService.addProjectToClient(payload);

    const deleted = await ProjectService.deleteProjectById(project._id.toString());
    expect(deleted).not.toBeNull();
    expect(deleted!._id.toString()).toBe(project._id.toString());

    const projects = await ProjectService.getAllProjects({});
    expect(projects.length).toBe(0);
  });
});
