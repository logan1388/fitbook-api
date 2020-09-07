// Copyright FitBook
import config from 'config';
import { MongoClient, MongoClientOptions, Db } from 'mongodb';

export default class Database {
  private static _db: Db;

  public static async initDb() {
    if (Database._db) {
      console.log('DB is already initialized!');
      return;
    }

    const mongoClientOptions: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      const mongoDbUrl: string = config.get('mongoURI');
      const mongoClient = await MongoClient.connect(mongoDbUrl, mongoClientOptions);
      if (mongoClient.isConnected()) {
        Database._db = mongoClient.db();
      }
    } catch (error) {
      console.log('Error initializing DB');
    }
  }

  public static getDb() {
    if (!Database._db) {
      throw Error('DB not initialized');
    }
    return Database._db;
  }
}
