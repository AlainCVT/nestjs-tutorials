# Tutorial by [Anson](https://www.youtube.com/@ansonthedev) #2

A GraphQL API built with NestJS, TypeORM and Apollo, demonstrating users and
their associated settings with a MySQL database.

## Overview

This tutorial shows how to build a GraphQL server with NestJS and persist
related data with TypeORM. The application exposes queries and mutations for
managing users and creating their email and notification preferences.

The project also demonstrates:

- GraphQL code-first schema generation
- Apollo Server integration
- MySQL entities and repositories with TypeORM
- One-to-one relationships between entities
- GraphQL field resolvers for nested settings
- Modular NestJS services and resolvers

## Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **GraphQL:** NestJS GraphQL with Apollo Server
- **Database:** MySQL
- **ORM:** TypeORM
- **Package manager:** pnpm
- **Testing:** Jest and Supertest

## Project Structure

```text
src/
├── users/
│   ├── graphql/
│   │   ├── inputs/     # GraphQL mutation inputs
│   │   ├── models/     # GraphQL types and TypeORM entities
│   │   └── resolvers/  # Queries and mutations
│   ├── users.service.ts
│   └── users-settings.service.ts
├── app.module.ts       # GraphQL and database configuration
├── main.ts             # Application entry point
└── schema.gql          # Generated GraphQL schema
```

## Prerequisites

- Node.js
- pnpm
- MySQL 8 or compatible server

## Installation

Install dependencies from this directory:

```bash
pnpm install
```

Create the MySQL database and user referenced by
[src/app.module.ts](src/app.module.ts):

```sql
CREATE DATABASE test_database;
CREATE USER 'test_username'@'localhost' IDENTIFIED BY 'test_password';
GRANT ALL PRIVILEGES ON test_database.* TO 'test_username'@'localhost';
FLUSH PRIVILEGES;
```

Set `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` in a `.env` file in this
directory. The application loads this file at startup.

TypeORM uses `synchronize: true`, so the configured tables are created
automatically when the application starts. Do not use this setting in
production.

## Getting Started

Start the application in development mode:

```bash
pnpm run start:dev
```

The GraphQL endpoint is available at:

```text
http://localhost:3000/graphql
```

Open that URL in a browser to access the GraphQL interface.

To build and run the production bundle:

```bash
pnpm run build
pnpm run start:prod
```

Set `PORT` in the environment to change the default port.

## GraphQL API

### Queries

```graphql
query {
  getUsers {
    id
    email
    username
    settings {
      userId
      receiveEmails
      receiveNotifications
    }
  }
}
```

```graphql
query {
  getUserById(id: 1) {
    id
    email
    username
  }
}
```

### Mutations

Create a user:

```graphql
mutation {
  createUser(
    createUserInput: { email: "alice@example.com", username: "alice" }
  ) {
    id
    email
    username
  }
}
```

Create settings for an existing user:

```graphql
mutation {
  createUserSettings(
    createUserSettingsInput: {
      userId: 1
      receiveEmails: true
      receiveNotifications: false
    }
  ) {
    userId
    receiveEmails
    receiveNotifications
  }
}
```

The generated schema is written to [src/schema.gql](src/schema.gql).

## Available Scripts

```bash
pnpm run start       # Start the application
pnpm run start:dev   # Start in watch mode
pnpm run start:debug # Start in debug and watch mode
pnpm run build       # Build the application
pnpm run lint        # Lint and fix source and test files
pnpm run format      # Format source and test files
pnpm run test        # Run unit tests
pnpm run test:e2e    # Run end-to-end tests
pnpm run test:cov    # Run tests with coverage
```

## Testing

The project includes an end-to-end test in
[test/app.e2e-spec.ts](test/app.e2e-spec.ts). It checks that the users query
returns an empty list, creates a user, and then verifies that the user appears
in the query results. The test requires the MySQL database configured above.

```bash
pnpm run test:e2e
```

`pnpm run test` is also available for unit tests; there are currently no unit
test files.

Generate a coverage report with:

```bash
pnpm run test:cov
```

## Source

[NestJS, GraphQL & TypeORM Tutorial](https://www.youtube.com/watch?v=CSfZmyzQAG8)
[Nest.js & GraphQL E2E Testing](https://www.youtube.com/watch?v=N_Zj0-JEuH8)
