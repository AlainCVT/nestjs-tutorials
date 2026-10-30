# Tutorial #4

A REST API built with NestJS and TypeScript to demonstrate user management and
common request-handling features.

## Overview

The application provides user CRUD endpoints backed by an in-memory collection.
It also demonstrates DTO validation, API-key middleware, a role guard, and a
response-transforming interceptor.

## Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Validation:** `class-validator` and `class-transformer`
- **Package manager:** pnpm
- **Testing:** Jest and Supertest

## Project Structure

```text
src/
├── guards/       # Role-based request guard
├── middleware/   # API-key middleware
├── users/        # User controller, service, and DTOs
├── utils/        # Response transformation interceptor
├── app.module.ts # Root module
└── main.ts       # Application entry point
```

## Features

### Users

- List users, optionally filtered by exact name or email, with an optional limit
- Retrieve a user by ID
- Create, update, and delete users
- Validate names and email addresses using DTOs

User data is stored in memory and resets whenever the application restarts.

### Request handling

- Users routes require a valid `x-api-key` header and a `role: admin` header.
- Successful responses are wrapped in an object containing `statusCode`,
  `message`, and `data`.

## Prerequisites

- Node.js
- pnpm

## Installation

Install dependencies from this directory:

```bash
pnpm install
```

Create a `.env` file and configure the API key used by the users routes:

```env
API_KEY=replace-with-your-api-key
```

The application uses port `3000` by default. Set `PORT` in `.env` to choose a
different port.

## Getting Started

Start the application in development mode:

```bash
pnpm run start:dev
```

The API is available at `http://localhost:3000`.

To build and run the production version:

```bash
pnpm run build
pnpm run start:prod
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

## API Endpoints

Send both `x-api-key` (matching `API_KEY` in `.env`) and `role: admin` with
requests to `/users`.

| Method   | Path         | Description                                                                                              |
| -------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `GET`    | `/`          | Return a greeting.                                                                                       |
| `GET`    | `/users`     | List users. Optional query parameters: `name`, `email`, and `limit`.                                     |
| `GET`    | `/users/:id` | Retrieve a user by ID.                                                                                   |
| `POST`   | `/users`     | Create a user with `name` and `email`.                                                                   |
| `PUT`    | `/users/:id` | Update a user's `name` and/or `email`.                                                                   |
| `DELETE` | `/users/id`  | Delete a user. The current controller registers the literal path `/users/id`, not a dynamic `:id` route. |

Names must contain at least three characters, and email addresses must be
valid. Updates can include either field.

## Testing

Run the unit and end-to-end tests from this directory:

```bash
pnpm run test
pnpm run test:e2e
```

Generate a coverage report with:

```bash
pnpm run test:cov
```

## Credits

https://www.youtube.com/watch?v=Q6NpiIp-6WM
