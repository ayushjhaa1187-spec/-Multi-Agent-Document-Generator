# Development Guide

Guidelines and best practices for developing the Multi-Agent Document Generator.

## Setting Up Development Environment

### Prerequisites
- Node.js v18+
- PostgreSQL v12+
- Git
- A code editor (VSCode recommended)

### Initial Setup

```bash
# Clone and install
git clone https://github.com/yourusername/Multi-Agent-Document-Generator.git
cd Multi-Agent-Document-Generator
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Setup database
npm run db:push

# Start development
npm run dev
```

## Development Workflow

### 1. Creating a Feature Branch

```bash
git checkout -b feature/my-feature-name
```

Use descriptive names:
- `feature/add-export-pdf`
- `fix/validate-project-name`
- `docs/update-readme`

### 2. Making Changes

Follow these principles:

**Code Style**
- Use TypeScript exclusively (no `any` types)
- Follow existing code patterns
- Keep functions small and focused
- Add type definitions for public functions

**Example:**
```typescript
// Good
async function saveProjectVersion(
  projectId: string,
  content: BRDContent
): Promise<BRD> {
  // implementation
}

// Avoid
async function saveBRD(p: any, c: any): any {
  // implementation
}
```

### 3. Running Tests Locally

```bash
# Run all tests
npm test

# Run specific test file
npm test route.test.ts

# Watch mode for development
npm test -- --watch
```

**Test Guidelines:**
- Write tests for new features
- Aim for >80% coverage
- Test both happy path and errors
- Use descriptive test names

### 4. Building and Linting

```bash
# Check for TypeScript errors
npm run build

# Lint code
npm run lint

# Format code (if prettier is configured)
npx prettier --write .
```

### 5. Committing Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/my-feature-name
```

**Commit Message Format:**
```
feat: add new feature
fix: fix bug description
docs: update documentation
style: format code
refactor: reorganize code
test: add or update tests
chore: update dependencies or config
```

## Code Organization

### File Placement

| What | Where | Example |
|------|-------|---------|
| API Routes | `app/api/` | `app/api/chat/route.ts` |
| React Components | `app/` | `app/page.tsx` |
| Utility Functions | `lib/` | `lib/cache.ts` |
| AI Agents | `lib/agents/` | `lib/agents/brd-planner.ts` |
| Database Config | `prisma/` | `prisma/schema.prisma` |
| Tests | Beside source | `app/api/chat/route.test.ts` |
| Documentation | `docs/` | `docs/API.md` |

### Naming Conventions

```typescript
// Files: kebab-case
brd-planner.ts
requirement-writer.ts

// Functions/Variables: camelCase
function generateBRD() {}
const maxRetries = 3;

// Classes/Types: PascalCase
interface BRDContent {}
class CacheManager {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const DEFAULT_TTL = 3600000;
```

## Working with the Database

### PrismaORM Commands

```bash
# Create a migration
npm run db:migrate

# Push schema changes
npm run db:push

# Reset database (warning: deletes all data)
npm run db:reset

# Open Prisma Studio (GUI)
npm run db:studio
```

### Modifying Schema

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Update API code to use new fields
4. Run tests to ensure nothing broke

### Database Best Practices

- Use indexed fields for queries
- Add `@@unique` constraints where needed
- Always validate data before saving
- Use transactions for multi-step operations

## Performance Development

### Monitoring Performance

```bash
# Check API metrics
curl http://localhost:3000/api/metrics

# Check analytics
curl http://localhost:3000/api/analytics
```

### Performance Targets

- API response: < 500ms
- Page load: < 3s
- Build time: < 5s
- Test suite: < 10s

### Profiling

```typescript
// Add performance markers
const start = performance.now();
// code to measure
const duration = performance.now() - start;
console.log(`Operation took ${duration}ms`);
```

## Debugging

### Using VSCode Debugger

1. Add breakpoint in code (click line number)
2. Run: `npm run dev`
3. Open DevTools (F12)
4. Use debugger to step through code

### Logging

```typescript
// Use console for debugging
console.log('Debug:', variable);
console.error('Error:', error);

// Check analytics logs
GET http://localhost:3000/api/analytics
```

### Common Issues

**Port already in use:**
```bash
npm run dev -- -p 3001
```

**Module not found:**
```bash
rm -rf node_modules
npm install
```

**Database connection failed:**
- Check `.env.local`
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

## Adding Features

### Checklist for New Features

- [ ] Create feature branch
- [ ] Write code following guidelines
- [ ] Add/update tests
- [ ] Document changes in comments
- [ ] Test locally with `npm run build`
- [ ] Update relevant documentation
- [ ] Run `npm test`
- [ ] Commit with conventional message
- [ ] Push and create pull request

### Example: Add New API Endpoint

1. **Create the route:**
   ```typescript
   // app/api/newfeature/route.ts
   export async function GET(req: Request) {
     return Response.json({ message: 'Hello' });
   }
   ```

2. **Add tests:**
   ```typescript
   // app/api/newfeature/route.test.ts
   it('should return 200', async () => {
     const res = await GET(new Request(...));
     assert(res.status === 200);
   });
   ```

3. **Update documentation:**
   - Add to `docs/API.md`
   - Document request/response format
   - Add example usage

4. **Test locally:**
   ```bash
   npm test
   npm run build
   ```

5. **Commit and push:**
   ```bash
   git commit -m "feat: add newfeature endpoint"
   git push origin feature/newfeature
   ```

## UI Development

### Adding Styles

```css
/* In app/globals.css or component-specific CSS */
.my-component {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  transition: all 0.3s ease;
}

.my-component:hover {
  border-color: rgba(168, 85, 247, 0.6);
}
```

### Using Tailwind

```tsx
<div className="bg-purple-600/30 border border-purple-400/30 rounded-xl p-4">
  Content
</div>
```

## Performance Optimization Tips

1. **Use caching** - Check `lib/cache.ts`
2. **Index database queries** - Update `prisma/schema.prisma`
3. **Lazy load components** - Use `React.lazy()` for large components
4. **Monitor metrics** - Check `/api/metrics` regularly
5. **Optimize images** - Use Next.js Image component

## TypeScript Tips

```typescript
// Use strict typing
function processData(data: unknown): ProcessedData {
  if (!isValidData(data)) {
    throw new Error('Invalid data');
  }
  return transform(data);
}

// Use utility types
type ReadonlyProject = Readonly<Project>;
type PartialBRD = Partial<BRD>;

// Use interfaces for contracts
interface ICache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}
```

## Getting Help

- Check existing code for patterns
- Read comments in complex functions
- Review `docs/ARCHITECTURE.md`
- Open a discussion on GitHub
- Ask in team chat/meetings

---

Happy coding! 🚀
