import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './../entities/Task.entity';
import { HttpService, HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../env/config';

const API_KEY = 'api_key_value';
const API_KEY_PROD = 'prod';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, host, port, username, password, name } =
          configService.database;
        const uri = `${connection}://${host}:${port}/`;
        return {
          uri,
          user: username,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'DB',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, host, port, username, password, name } =
          configService.database;
        const uri = `${connection}://${username}:${password}@${host}:${port}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(name);
        return db;
      },
      inject: [config.KEY],
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const { data } = await http.axiosRef.get<Task[]>(
          'https://jsonplaceholder.typicode.com/todos',
        );
        return data;
      },
      inject: [HttpService],
    },
  ],
  exports: ['API_KEY', 'TASKS', 'DB', MongooseModule],
})
export class DatabaseModule {}
