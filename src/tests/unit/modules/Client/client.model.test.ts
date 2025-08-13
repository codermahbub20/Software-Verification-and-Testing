import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Client } from '../../../../../src/app/modules/Client/client.model';

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
  await Client.deleteMany({});
});

describe('Client Model Test', () => {
  it('should create & save a client successfully', async () => {
    const validClient = new Client({
      name: 'John Doe',
      email: 'john@example.com',
      userEmail: 'user@example.com',
      phone: '1234567890',
      company: 'Test Corp',
      notes: 'Some notes',
    });

    const savedClient = await validClient.save();

    expect(savedClient._id).toBeDefined();
    expect(savedClient.name).toBe('John Doe');
    expect(savedClient.email).toBe('john@example.com');
    expect(savedClient.userEmail).toBe('user@example.com');
    expect(savedClient.phone).toBe('1234567890');
    expect(savedClient.company).toBe('Test Corp');
    expect(savedClient.notes).toBe('Some notes');
  });

  it('should fail if required fields are missing', async () => {
    const clientWithoutRequiredField = new Client({ name: 'John Doe' });

    let err: mongoose.Error.ValidationError | undefined;
    try {
      await clientWithoutRequiredField.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors.email).toBeDefined();
    expect(err?.errors.userEmail).toBeDefined();
    expect(err?.errors.phone).toBeDefined();
  });

  it('should allow optional fields to be empty', async () => {
    const client = new Client({
      name: 'Jane Doe',
      email: 'jane@example.com',
      userEmail: 'user@example.com',
      phone: '0987654321',
    });

    const savedClient = await client.save();

    expect(savedClient.company).toBeUndefined();
    expect(savedClient.notes).toBeUndefined();
  });
});
