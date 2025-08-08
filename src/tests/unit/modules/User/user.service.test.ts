import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../../../app/modules/User/user.model';
import { UserServices } from '../../../../app/modules/User/user.service';


const userRole: 'admin' | 'user' = 'user'; 


describe('UserServices', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const payload = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: userRole,
    isBlocked: false,
    };
    const user = await UserServices.createUserInToDB(payload);
    expect(user._id).toBeDefined();
    expect(user.name).toBe(payload.name);
    expect(user.email).toBe(payload.email);
  });

  it('should get all users', async () => {
    await UserServices.createUserInToDB({
      name: 'User1',
      email: 'user1@example.com',
      password: 'pass',
      role: 'user',
      isBlocked: false,
    });
    await UserServices.createUserInToDB({
      name: 'User2',
      email: 'user2@example.com',
      password: 'pass',
      role: 'user',
        isBlocked: false,
    });

    const users = await UserServices.getAllUserFromDB();
    expect(users.length).toBe(2);
  });

  it('should block a user by admin', async () => {
    const user = await UserServices.createUserInToDB({
      name: 'BlockMe',
      email: 'blockme@example.com',
      password: 'pass',
      role: 'user',
      isBlocked: true,
    });

    const blockedUser = await UserServices.blockedUserByAdminFromDB(user._id.toString());
    expect(blockedUser).not.toBeNull();
    expect(blockedUser!.isBlocked).toBe(true);
  });
});
