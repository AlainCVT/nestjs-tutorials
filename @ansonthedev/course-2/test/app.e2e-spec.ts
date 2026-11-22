import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  describe('getUsers', () => {
    it('should query getUsers and return 0 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ getUsers { id email username } }' })
        .expect((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.data.getUsers).toEqual([]);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'mutation { createUser(createUserInput: { email: "amy@mail.com", username: "Amy" }) { id email username } }',
        })
        .expect(200)
        .expect((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.data.createUser).toEqual({
            id: 1,
            email: 'amy@mail.com',
            username: 'Amy',
          });
        });
    });

    it('should query getUsers and return 1 user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{ getUsers { id email username } }' })
        .expect((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.data.getUsers).toEqual([
            {
              id: 1,
              email: 'amy@mail.com',
              username: 'Amy',
            },
          ]);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });
});
