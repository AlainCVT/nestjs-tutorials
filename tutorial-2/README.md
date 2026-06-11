# Tutorial #2

A comprehensive messaging and user management API built with [NestJS](https://nestjs.com/), featuring authentication, user management, and real-time messaging capabilities.

## Overview

This is a backend API service built with **NestJS** and **TypeScript**, providing a robust foundation for a messaging application. It includes:

- 🔐 **JWT-based Authentication** - Secure user login and token management
- 👥 **User Management** - Create, retrieve, and manage user accounts
- 💬 **Messaging System** - Send and retrieve messages between users
- 🗄️ **MySQL Database** - Persistent data storage with TypeORM ORM
- 🛡️ **Authorization Guards** - Request-level authentication and authorization
- 📝 **Data Validation** - DTOs and class validators for request validation

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) 11.x
- **Language**: TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Package Manager**: pnpm
- **Testing**: Jest

## Project Structure

```
src/
├── auth/              # Authentication module (JWT, guards, interceptors)
├── users/             # User management module
├── messages/          # Messaging module
├── models/            # Data models and DTOs
├── app.module.ts      # Root module
└── main.ts            # Application entry point
```

## Features

### Authentication

- User registration and login
- JWT token generation and validation
- Auth guards for protected routes
- Request/response interceptors for token handling

### Users

- User profile management
- User data persistence
- User-specific operations

### Messages

- Send messages
- Retrieve all messages
- Retrieve individual messages by ID

## Description

## Prerequisites

- Node.js 18+ (with npm or pnpm)
- MySQL Server 8.0+
- pnpm package manager (or npm/yarn)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd nest-project
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nest_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=3600
```

4. **Initialize the database**
   Ensure MySQL is running and the database exists, then run migrations if available.

## Getting Started

### Development

```bash
# Start development server with file watching
$ pnpm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
$ pnpm run build

# Run production build
$ pnpm run start:prod
```

### Debugging

```bash
# Start with debug mode
$ pnpm run start:debug
```

## Available Scripts

```bash
# Build the project
$ pnpm run build

# Format code with Prettier
$ pnpm run format

# Lint and fix code
$ pnpm run lint

# Run unit tests
$ pnpm run test

# Run tests in watch mode
$ pnpm run test:watch

# Generate test coverage report
$ pnpm run test:cov

# Run e2e tests
$ pnpm run test:e2e
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Messages

- `GET /messages` - Get all messages
- `GET /messages/:id` - Get message by ID
- `POST /messages` - Create new message

## Testing

```bash
# Unit tests
$ pnpm run test

# E2E tests
$ pnpm run test:e2e

# Test coverage
$ pnpm run test:cov
```

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check `.env` file configuration
- Ensure database user has proper permissions
- Verify port 3306 is accessible

### JWT Token Issues

- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration time
- Verify token is included in Authorization header

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [JWT Documentation](https://jwt.io)

# Credits

https://www.youtube.com/playlist?list=PLefbK3BVFZt4K_0-KwS4TqAN1KFbM7pNt
