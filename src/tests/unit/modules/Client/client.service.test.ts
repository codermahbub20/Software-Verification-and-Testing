import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Client } from '../../../../../src/app/modules/Client/client.model';
import { ClientService } from '../../../../../src/app/modules/Client/client.service';
import { TClient } from '../../../../../src/app/modules/Client/client.interface';

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

describe('ClientService Unit Tests', () => {
  const clientData: TClient = {
    name: 'John Doe',
    email: 'john@example.com',
    userEmail: 'user@example.com',
    phone: '1234567890',
    company: 'Test Corp',
    notes: 'Some notes',
  };

  it('should create a client successfully', async () => {
    const result = await ClientService.createClient(clientData);
    expect(result._id).toBeDefined();
    expect(result.name).toBe(clientData.name);
    expect(result.email).toBe(clientData.email);
  });

  it('should get all clients', async () => {
    await ClientService.createClient(clientData);
    const clients = await ClientService.getAllClients({});
    expect(clients.length).toBe(1);
    expect(clients[0].name).toBe(clientData.name);
  });

  it('should filter clients by userEmail', async () => {
    await ClientService.createClient(clientData);
    const clients = await ClientService.getAllClients({ userEmail: 'user@example.com' });
    expect(clients.length).toBe(1);
    expect(clients[0].userEmail).toBe('user@example.com');
  });

  it('should update a client by id', async () => {
    const client = await ClientService.createClient(clientData);
    const updated = await ClientService.updateClientById(client._id.toString(), { name: 'Updated Name' });
    expect(updated?.name).toBe('Updated Name');
  });

  it('should delete a client by id', async () => {
    const client = await ClientService.createClient(clientData);
    const deleted = await ClientService.deleteClientById(client._id.toString());
    expect(deleted?._id.toString()).toBe(client._id.toString());
    const remainingClients = await ClientService.getAllClients({});
    expect(remainingClients.length).toBe(0);
  });
});
