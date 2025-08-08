import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private mongoServer?: MongoMemoryServer;

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(uri?: string): Promise<void> {
    try {
      let connectionUri = uri || process.env.MONGODB_URI;

      if (process.env.NODE_ENV === 'test') {
        this.mongoServer = await MongoMemoryServer.create();
        connectionUri = this.mongoServer.getUri();
      }

      if (!connectionUri) {
        throw new Error('MongoDB connection URI is required');
      }

      await mongoose.connect(connectionUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
      
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Database disconnection error:', error);
      throw error;
    }
  }

  public async clearDatabase(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      const collections = mongoose.connection.collections;
      
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}