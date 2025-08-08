import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // adjust path
import bcrypt from 'bcrypt';
import { User } from '../../../../src/app/modules/User/user.model';

jest.setTimeout(60000); // increase timeout for slow CI if needed

describe('User Model Test Suite', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clean up DB between tests
    await User.deleteMany({});
  });

  it('should create & save a user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword123',
      role: 'user',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe('user');
    expect(savedUser.isBlocked).toBe(false);
    expect(savedUser.password).not.toBe(userData.password); // password should be hashed

    // timestamps should exist
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });

  it('should hash password before saving', async () => {
    const plainPassword = 'secret123';
    const user = new User({
      name: 'Jane',
      email: 'jane@example.com',
      password: plainPassword,
    });

    const savedUser = await user.save();

    // Password stored in DB should not be plain text
    expect(savedUser.password).not.toBe(plainPassword);

    // Use bcrypt to verify password matches hashed password
    const isMatch = await bcrypt.compare(plainPassword, savedUser.password);
    expect(isMatch).toBe(true);
  });

  it('should clear password field after saving (post save hook)', async () => {
    const user = new User({
      name: 'Mike',
      email: 'mike@example.com',
      password: 'mikepass',
    });
    const savedUser = await user.save();

    // password should be cleared after save
    expect(savedUser.password).toBe('');
  });

  describe('Static methods', () => {
    beforeEach(async () => {
      // Add a blocked user
      await User.create({
        name: 'Blocked User',
        email: 'blocked@example.com',
        password: 'blockedpass',
        isBlocked: true,
      });
      // Add a normal user
      await User.create({
        name: 'Active User',
        email: 'active@example.com',
        password: 'activepass',
      });
    });

    it('isPasswordMatched returns true for matching passwords', async () => {
      const user = await User.findOne({ email: 'active@example.com' }).select('+password');
      if (!user) throw new Error('User not found');

      const match = await User.isPasswordMatched('activepass', user.password);
      expect(match).toBe(true);
    });

    it('isPasswordMatched returns false for non-matching passwords', async () => {
      const user = await User.findOne({ email: 'active@example.com' }).select('+password');
      if (!user) throw new Error('User not found');

      const match = await User.isPasswordMatched('wrongpass', user.password);
      expect(match).toBe(false);
    });

    it('isUserBlocked returns the user if blocked', async () => {
      const blockedUser = await User.isUserBlocked('blocked@example.com');
      expect(blockedUser).not.toBeNull();
      expect(blockedUser!.email).toBe('blocked@example.com');
    });

    it('isUserBlocked returns null if user is not blocked', async () => {
      const notBlocked = await User.isUserBlocked('active@example.com');
      expect(notBlocked).toBeNull();
    });

    it('isUserExistByEmail returns user with password included', async () => {
      const user = await User.isUserExistByEmail('active@example.com');
      expect(user).not.toBeNull();
      expect(user!.email).toBe('active@example.com');
      expect(user!.password).toBeDefined();
    });

    it('isUserExistByEmail returns null if user not found', async () => {
      const user = await User.isUserExistByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });
  });
});
