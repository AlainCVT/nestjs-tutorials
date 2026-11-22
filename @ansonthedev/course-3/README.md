# Tutorial by [Anson](https://www.youtube.com/@ansonthedev) #3

A REST API built with NestJS, MongoDB, and Mongoose. This project demonstrates
how to define Mongoose schemas, create relationships between documents,
validate requests with DTOs, and use NestJS services to access the database.

## Features

- MongoDB connection configured with `@nestjs/mongoose`
- Mongoose schemas for users, user settings, and posts
- Relationships between users, settings, and posts
- User CRUD operations
- Post creation associated with a user
- Incoming data validation with `class-validator`
- MongoDB identifier validation with `mongoose.Types.ObjectId`
- `400 Bad Request` and `404 Not Found` error handling

## Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** class-validator and class-transformer
- **Package manager:** pnpm
- **Testing:** Jest and Supertest

## Project Structure

```text
src/
├── users/
│   ├── dto/                # Create and update DTOs
│   ├── users.controller.ts # User routes
│   ├── users.service.ts    # User database access
│   └── users.module.ts
├── posts/
│   ├── dto/                # Post creation DTO
│   ├── posts.controller.ts # Post creation route
│   ├── posts.service.ts
│   └── posts.module.ts
├── schemas/
│   ├── User.schema.ts
│   ├── UserSettings.schema.ts
│   └── Post.schema.ts
├── app.module.ts
└── main.ts
```

## Prerequisites

- Node.js
- pnpm
- A local MongoDB instance or MongoDB Atlas

## Installation

Install dependencies from this directory:

```bash
pnpm install
```

Create an `.env` file in the project directory and add the MongoDB connection
URI:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/nestjs-tutorial
# PORT=3000
```

For MongoDB Atlas, use the connection URI provided by your cluster:

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

Never commit real credentials to the repository.

## Getting Started

Start the application in development mode:

```bash
pnpm run start:dev
```

The API is available at:

```text
http://localhost:3000
```

The port can be changed with the `PORT` environment variable.

To build and run the production bundle:

```bash
pnpm run build
pnpm run start:prod
```

## API

### Users

| Method   | Route        | Description                    |
| -------- | ------------ | ------------------------------ |
| `GET`    | `/users`     | List users                     |
| `GET`    | `/users/:id` | Get a user by ID               |
| `POST`   | `/users`     | Create a user                  |
| `PATCH`  | `/users/:id` | Update a user's name or avatar |
| `DELETE` | `/users/:id` | Delete a user                  |

#### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "username": "alice",
    "settings": {
      "receiveNotifications": true,
      "receiveEmails": true,
      "receiveSMS": false
    }
  }'
```

The `settings` object is optional. When provided, a separate `UserSettings`
document is created and associated with the user.

#### List Users

```bash
curl http://localhost:3000/users
```

Responses include the associated settings and posts through `populate`.

#### Get a User

```bash
curl http://localhost:3000/users/<mongo-object-id>
```

#### Update a User

```bash
curl -X PATCH http://localhost:3000/users/<mongo-object-id> \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice-updated",
    "avatar": "https://example.com/alice.png"
  }'
```

#### Delete a User

```bash
curl -X DELETE http://localhost:3000/users/<mongo-object-id>
```

### Posts

| Method | Route    | Description              |
| ------ | -------- | ------------------------ |
| `POST` | `/posts` | Create a post for a user |

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first post",
    "content": "Discovering NestJS with MongoDB.",
    "userId": "<mongo-object-id>"
  }'
```

The `title` is limited to 100 characters and `content` to 500 characters.
The user must exist; otherwise, the API returns `404 Not Found`.

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
pnpm run test:cov    # Generate a coverage report
pnpm run test:watch  # Run tests in watch mode
```

## Tests

The end-to-end tests start the NestJS application with `AppModule`. MongoDB
must therefore be accessible through `MONGODB_URI` before running them:

```bash
pnpm run test:e2e
```

## Source

[NestJS with MongoDB & Mongoose Tutorial](https://www.youtube.com/watch?v=dJz94r5C3QA)
