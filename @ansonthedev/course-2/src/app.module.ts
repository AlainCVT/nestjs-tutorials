import 'dotenv/config';

import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './users/graphql/models/User.model';
import { UserSettingsModel } from './users/graphql/models/UserSettings.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:
        process.env.NODE_ENV === 'test'
          ? 'test_username'
          : process.env.DB_USERNAME,
      password:
        process.env.NODE_ENV === 'test'
          ? 'test_password'
          : process.env.DB_PASSWORD,
      database:
        process.env.NODE_ENV === 'test'
          ? 'test_database'
          : process.env.DB_DATABASE,
      entities: [UserModel, UserSettingsModel],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
