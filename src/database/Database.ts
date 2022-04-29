import config from 'config';
import { DataSource, EntityTarget, Repository } from 'typeorm';

export default class Database {
  private static instance: Database;
  private AppDataSource: DataSource;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public isInited(): boolean {
    return !!this.AppDataSource;
  }

  public async init(): Promise<void> {
    try {
      this.AppDataSource = new DataSource({
        ...config.get('Database'),
        //@ts-ignore
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
      });
      await this.AppDataSource.initialize();
      console.log('Connected to Postgres');
    } catch (error) {
      console.log(`Database error: ${error}`);
    }
  }

  public getRepository(entity: EntityTarget<any>): Repository<any> {
    return this.AppDataSource.getRepository(entity);
  }
}
