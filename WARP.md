# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Sprigly is a productivity dashboard built with Next.js 15, featuring task management, event scheduling, and team chat capabilities. The app uses a modern tech stack with TypeScript, Tailwind CSS v4, and Prisma for database operations.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build production version with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Database Commands (Prisma)
- `npx prisma generate` - Generate Prisma client (outputs to `src/generated/prisma/`)
- `npx prisma db push` - Push schema to database without migrations
- `npx prisma studio` - Open Prisma Studio for database exploration
- `npx prisma migrate dev` - Create and apply new migration

## Architecture Overview

### App Structure
```
src/
├── app/                    # App Router (Next.js 15)
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/          # Chat/messaging API
│   │   ├── events/        # Event management API
│   │   └── tasks/         # Task management API
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Main app interface
├── components/ui/         # Reusable UI components
└── lib/                  # Utilities and configurations
    ├── auth.ts           # JWT authentication logic
    └── db.ts            # Prisma client configuration
```

### Database Configuration
- Uses PostgreSQL with Prisma ORM
- Database URL configured via `DATABASE_URL` environment variable
- Prisma client outputs to `src/generated/prisma/`
- Connection pooling and health checks implemented in `src/lib/db.ts`

### Authentication System
- JWT-based authentication with 7-day expiration
- Bearer token authentication for API routes
- Helper functions in `src/lib/auth.ts` for token management
- Password hashing currently uses simple Base64 (needs bcrypt for production)
- Protected route wrapper via `requireAuth()` function

### API Design Patterns
All API routes follow consistent patterns:
- GET requests return collections (e.g., `{ tasks: [...] }`)
- POST requests create new resources with validation
- PUT requests update existing resources
- DELETE requests use query parameters for IDs
- Standard error responses with `success`, `message` fields
- Mock data storage (replace with database operations)

## Key Implementation Details

### Path Configuration
- TypeScript path alias: `@/*` maps to `./src/*`
- Prisma client: Import from `@prisma/client` (generated in `src/generated/prisma/`)

### Styling and UI
- Tailwind CSS v4 with PostCSS processing
- Geist fonts (Sans and Mono) configured in root layout
- Consistent component patterns in dashboard pages
- UI components in `src/components/ui/` (e.g., `Button.tsx`)

### Development Environment
- Next.js 15 with App Router and Turbopack
- TypeScript with strict configuration
- ESLint with Next.js and TypeScript presets
- React 19.1.0 for latest features

## Important Notes

### Security Considerations
- JWT secret should be properly configured via `JWT_SECRET` environment variable
- Current password hashing is placeholder - implement bcrypt for production
- API routes include basic authentication but need proper user context integration

### Data Flow
- All API routes currently use in-memory mock data
- Database integration ready via Prisma client in `src/lib/db.ts`
- Frontend components are static HTML - need to integrate with API endpoints

### Testing Strategy
- No test framework currently configured
- Consider adding Jest + Testing Library for component tests
- API routes should have integration tests

## Environment Variables Required
```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
```