import mongoose from 'mongoose';
import { TProject } from '../../../../app/modules/Project/project.interface';
import { Project } from '../../../../app/modules/Project/project.model';
import { MongoMemoryServer } from 'mongodb-memory-server';


describe('Project Model Unit Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });


  it('should create a valid project document', async () => {
    const validProject: TProject = {
      title: 'Website Redesign',
      userEmail: 'client@example.com',
      budget: 5000,
      deadline: new Date('2025-12-31'),
      status: 'Ongoing',
     clientId: new mongoose.Types.ObjectId().toString()

    };

    const project = new Project(validProject);
    const savedProject = await project.save();

    expect(savedProject._id).toBeDefined();
    expect(savedProject.title).toBe(validProject.title);
  });

  it('should fail validation when required fields are missing', async () => {
    const invalidProject = new Project({}); // missing required fields

    let err;
    try {
      await invalidProject.validate();
    } catch (error: any) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.userEmail).toBeDefined();
    expect(err.errors.budget).toBeDefined();
    expect(err.errors.deadline).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });

  it('should fail validation for invalid status enum', async () => {
    const invalidProject = new Project({
      title: 'Test Project',
      userEmail: 'client@example.com',
      budget: 3000,
      deadline: new Date(),
      status: 'NotAValidStatus', // invalid enum
      clientId: new mongoose.Types.ObjectId(),
    });

    let err;
    try {
      await invalidProject.validate();
    } catch (error: any) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });
});
