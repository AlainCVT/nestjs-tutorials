import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './users/graphql/models/User.model';
import { UserSettingsModel } from './users/graphql/models/UserSettings.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTest = configService.get<string>('NODE_ENV') === 'test';
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: Number(configService.get<string>('DB_PORT', '3306')),
          username: isTest
            ? configService.get<string>('TEST_DB_USERNAME')
            : configService.get<string>('DB_USERNAME'),
          password: isTest
            ? configService.get<string>('TEST_DB_PASSWORD')
            : configService.get<string>('DB_PASSWORD'),
          database: isTest
            ? configService.get<string>('TEST_DB_DATABASE')
            : configService.get<string>('DB_DATABASE'),
          entities: [UserModel, UserSettingsModel],
          synchronize: true,
        };
      },
    }),

    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
