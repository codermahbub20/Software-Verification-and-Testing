import express, { Express } from 'express';
import request from 'supertest';
import { userRoutes } from '../../../../app/modules/User/user.route';

// Mock the auth middleware
jest.mock('../../../../app/middlewares/auth', () => {
  return jest.fn(() => (req: any, res: any, next: any) => next());
});

// Mock the UserController
jest.mock('../../../../app/modules/User/user.controller', () => ({
  UserController: {
    blockUserByAdmin: jest.fn((req, res) =>
      res.status(200).json({ message: `User ${req.params.userId} blocked` })
    ),
    getAllUsers: jest.fn((req, res) =>
      res.status(200).json([{ id: 1, name: 'John Doe' }])
    ),
  },
}));


describe('User Routes', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', userRoutes); // Mount the router under /api
  });

  it('PATCH /users/:userId/block should block user', async () => {
    const res = await request(app).patch('/api/users/123/block');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'User 123 blocked' });
  });

  it('GET / should return all users', async () => {
    const res = await request(app).get('/api/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'John Doe' }]);
  });
});
