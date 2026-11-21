# Tutorial by [Anson](https://www.youtube.com/@ansonthedev) #0

A short NestJS crash course covering modules, controllers, services, middleware,
pipes, DTO validation, and exception handling.

## Features

- In-memory user collection
- CRUD-style read and create endpoints
- Authorization middleware using a fixed token
- DTO validation with `class-validator`
- Custom and built-in pipes
- Parameter and not-found exceptions

## Prerequisites

- Node.js
- pnpm

## Installation

```bash
pnpm install
```

## Getting Started

```bash
pnpm run start:dev
```

The API is available at `http://localhost:3000`.

All `/users` requests must include the authorization header:

```text
Authorization: SECRET_TOKEN
```

## API

| Method | Path         | Description              |
| ------ | ------------ | ------------------------ |
| `GET`  | `/users`     | List all users           |
| `GET`  | `/users/:id` | Get a user by numeric ID |
| `POST` | `/users`     | Create a user            |

Example:

```bash
curl -H "Authorization: SECRET_TOKEN" http://localhost:3000/users
```

```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: SECRET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username":"Alice","email":"alice@example.com","age":25}'
```

User data is stored in memory and is reset when the application restarts.

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

[NestJS Crash Course](https://www.youtube.com/watch?v=xzu3QXwo1BU)
