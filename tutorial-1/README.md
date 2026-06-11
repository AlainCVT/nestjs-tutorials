# Tutorial #1

This repository contains a small NestJS application demonstrating a GraphQL API with basic features for articles, comments and authentication. It is intended as a tutorial / starter project to learn how to build a modular GraphQL server with NestJS.

## Features

- GraphQL API (schema defined in `schema.gql`)
- Article management (create, update, delete, list, pagination)
- Commenting on articles
- Basic user authentication with JWT and local strategy
- Modular NestJS structure (modules for `article`, `comment`, `auth`, `user`, `pagination`)
- Docker Compose example for local database setup

## Tech stack

- Node.js + TypeScript
- NestJS framework
- GraphQL
- JWT for authentication
- Docker / Docker Compose (optional)

## Getting started

### Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Docker & Docker Compose (optional, for running a database)

### Environment

Copy or edit the file `database.env` to configure your database connection and secrets. The project may expect environment variables for the database and JWT secret.

### Install dependencies

```bash
npm install
# or
yarn install
```

### Start database (optional, with Docker Compose)

```bash
docker-compose up -d
```

### Run the app

Development with auto-reload:

```bash
npm run start:dev
```

Build and run production bundle:

```bash
npm run build
npm run start:prod
```

### GraphQL Playground

By default, the GraphQL playground / GraphiQL endpoint is exposed by NestJS when running in development mode. Open http://localhost:3000/graphql (or the port configured in the app) to explore the schema and run queries and mutations defined in `schema.gql`.

## Tests

Unit and e2e tests are included (see `test/` and spec files under `src/`). Run them with:

```bash
npm run test
npm run test:e2e
```

## Project structure

Key folders under `src/`:

- `article/` — article module, DTOs, resolvers and model
- `auth/` — authentication module, strategies and resolvers
- `comment/` — comment module and resolvers
- `user/` — user module and resolvers
- `pagination/` — shared pagination DTOs/models
- `test/` — end-to-end tests

The GraphQL schema root is in `schema.gql`.

## Contributing

Contributions and fixes are welcome. For small tutorial repositories, open an issue or submit a pull request with a clear description of changes.

## Notes

- This project is structured as a learning example. It focuses on demonstrating NestJS modules, GraphQL resolvers and simple auth flows rather than production-ready configuration and hardening.
- Adjust environment variables, secrets and database settings before deploying to production.

## Credits

**NB:** author removed YouTube video.
