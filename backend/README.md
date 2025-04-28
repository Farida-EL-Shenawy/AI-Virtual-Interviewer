# AI Virtual Interviewer Backend

This is the backend service for the AI Virtual Interviewer platform, built with TypeScript, Express, and MongoDB.

## Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest with MongoDB Memory Server
- **Validation**: Zod
- **Logging**: Winston
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
/backend
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── migrations/      # Database migrations
│   ├── test/           # Test utilities and setup
│   └── server.ts       # Application entry point
├── dist/               # Compiled JavaScript
├── coverage/           # Test coverage reports
└── __tests__/         # Test files
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run typecheck` - Check TypeScript types
- `npm run migrate` - Run database migrations

### Database Migrations

Migrations are managed using mongoose-migrate:

1. Create a new migration:
   ```bash
   npm run migrate:create <migration-name>
   ```

2. Run pending migrations:
   ```bash
   npm run migrate:up
   ```

3. Rollback last migration:
   ```bash
   npm run migrate:down
   ```

### Testing

Tests are written using Jest and include:

- Unit tests for models and services
- Integration tests for API endpoints
- E2E tests for critical flows

Run tests with coverage:
```bash
npm run test:coverage
```

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Husky for pre-commit hooks

### Logging

Logging is implemented using Winston:

- Error logs: `error.log`
- Combined logs: `combined.log`
- Database logs: `database.log`

### API Documentation

API documentation is available at `/api-docs` when running the server.

## Type Safety

- Strict TypeScript configuration
- Zod schemas for runtime validation
- Comprehensive interface definitions
- Proper error handling with type-safe errors

## Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- Secure password hashing
- JWT authentication

## Performance

- Database indexing
- Query optimization
- Connection pooling
- Proper error handling
- Caching strategies

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT