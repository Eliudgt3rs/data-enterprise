# Testing & Quality Assurance - DataFactor Enterprise

## Testing Strategy
The DataFactor Enterprise platform adheres to elite valuation standards ($5,000+ licensing tier) with an 80%+ test coverage threshold enforced via automated CI pipelines.

### Test Suites
1. **Unit Tests (Vitest & React Testing Library)**:
   - Located in `tests/unit/`.
   - Validates core business logic, Zod validation schemas, and utility functions.
   - Run command: `npm run test`

2. **Integration Tests (Vitest)**:
   - Located in `tests/integration/`.
   - Tests API route handlers, Prisma ORM queries, and request/response lifecycles.

3. **End-to-End Tests (Playwright)**:
   - Located in `tests/e2e/`.
   - Simulates complete user sessions across the Next.js App Router interface.
   - Run command: `npm run test:e2e`

### Coverage Reports
Coverage reports are generated via V8 coverage provider:
```bash
npm run test:coverage
```
Thresholds enforced:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
