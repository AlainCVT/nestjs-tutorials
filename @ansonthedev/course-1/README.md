# Tutorial by [Anson](https://www.youtube.com/@ansonthedev) #1

A short NestJS crash course demonstrating TypeORM, MySQL, password hashing,
and entity relationships.

## Features

- MySQL database integration with TypeORM
- User CRUD endpoints
- Password hashing with bcrypt
- One-to-one relation between users and profiles
- One-to-many relation between users and posts
- Automatic table synchronization for development

## Prerequisites

- Node.js
- pnpm
- MySQL

## Installation

```bash
pnpm install
```

Create the database configured in [src/app.module.ts](src/app.module.ts):

```sql
CREATE DATABASE root_database;
```

The current local configuration uses:

```text
Host: localhost
Port: 3306
Username: root
Password: root
Database: root_database
```

Update [src/app.module.ts](src/app.module.ts) if your MySQL credentials differ.

## Getting Started

```bash
pnpm run start:dev
```

The API is available at `http://localhost:3000`.

## API

| Method   | Path                  | Description                   |
| -------- | --------------------- | ----------------------------- |
| `GET`    | `/users`              | List users and their profiles |
| `POST`   | `/users`              | Create a user                 |
| `PUT`    | `/users/:id`          | Update a user                 |
| `DELETE` | `/users/:id`          | Delete a user                 |
| `POST`   | `/users/:id/profiles` | Create a profile for a user   |
| `POST`   | `/users/:id/posts`    | Create a post for a user      |

Example:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret"}'
```

```bash
curl -X POST http://localhost:3000/users/1/profiles \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Doe","birthday":"1995-01-01"}'
```

```bash
curl -X POST http://localhost:3000/users/1/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"First post","description":"Hello NestJS"}'
```

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

## Source

[NestJS, MySQL, TypeORM Crash Course](https://www.youtube.com/watch?v=W1gvIw0GNl8)
