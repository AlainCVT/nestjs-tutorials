# Tutorial #3

A minimal full-stack project consisting of a NestJS backend and a Next.js frontend.

## Overview

- **Backend:** REST API built with NestJS, JWT authentication, and data persistence using Prisma + PostgreSQL.
- **Frontend:** Next.js interface (App Router) consuming the API.

## Architecture

- `backend/`: NestJS server, with routes prefixed by `/api` (see `backend/src/main.ts`).
- `backend/prisma/schema.prisma`: Prisma data model (using PostgreSQL).
- `frontend/`: Next.js (React) application serving the user interface.

## Tech Stack

### Backend

- NestJS
- Prisma
- PostgreSQL
- Passport/JWT

### Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui

### Package Manager

- Recommended: `pnpm`

## Prerequisites

- Node.js (LTS version recommended)
- pnpm (or npm/yarn)
- PostgreSQL (local or remote)

## Installation and Local Development

### 1. Backend

```bash
cd backend
pnpm install

# Set the required environment variables
# At minimum: DATABASE_URL and JWT_SECRET
export DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
export JWT_SECRET="change_me"

# Run the backend on port 3001 to avoid conflicts with Next.js
export PORT=3001

# Generate the Prisma client and apply migrations (if needed)
npx prisma generate
npx prisma migrate dev --name init

pnpm run start:dev
```

The API is prefixed with `/api`.

Example:

```text
http://localhost:3001/api/users
```

### 2. Frontend

```bash
cd frontend
pnpm install

# Point the frontend to the local API
export NEXT_PUBLIC_API_BASE="http://localhost:3001/api"

pnpm run dev
```

Open:

```text
http://localhost:3000
```

to access the application.

## Testing

### Backend

```bash
pnpm run test
pnpm run test:e2e
```

Run these commands from the `backend/` directory.

### Frontend

Use your usual tooling (linting and tests, if available).

## Useful Files

- Server configuration: `backend/src/main.ts`
- Prisma schema: `backend/prisma/schema.prisma`
- Authentication controller: `backend/src/auth/auth.controller.ts`
- Users controller: `backend/src/users/users.controller.ts`

## Deployment

### Backend

```bash
pnpm run build
pnpm run start:prod
```

### Frontend

```bash
pnpm run build
pnpm run start
```

Make sure PostgreSQL and all required environment variables are properly configured in production.

## Credits

https://www.youtube.com/playlist?list=PLFlURPbtyOqgn2iC-iREQUXg25gX_XCOY
