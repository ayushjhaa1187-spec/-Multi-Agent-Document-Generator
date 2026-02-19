# Contributing to Multi-Agent Document Generator

We welcome contributions from the community! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the standards of behavior we expect.

## How to Contribute

### 1. Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub with:

- **Clear Title**: Concise description of the issue
- **Detailed Description**: What's the problem or feature request?
- **Steps to Reproduce** (for bugs): How to reproduce the issue
- **Expected Behavior**: What should happen?
- **Actual Behavior**: What actually happens?
- **Environment**: Node version, OS, browser, etc.
- **Screenshots/Logs**: If applicable

### 2. Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/Multi-Agent-Document-Generator.git
cd Multi-Agent-Document-Generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Create local database
npm run db:push

# Start development server
npm run dev
```

### 3. Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Follow Code Style**
   - Use TypeScript for type safety
   - Follow the existing code structure
   - Run ESLint: `npm run lint`
   - Format with Prettier: `npx prettier --write .`

3. **Write Tests**
   - Add unit tests for new functionality
   - Update existing tests if behavior changes
   - Run tests: `npm test`

4. **Update Documentation**
   - Update README.md if adding features
   - Update relevant docs in the `docs/` folder
   - Add inline comments for complex logic

### 4. Committing Changes

Follow conventional commit messages:

```
feat: add new feature description
fix: fix bug description
docs: update documentation
style: format code
refactor: reorganize code
test: add or update tests
chore: update dependencies
```

Example:
```bash
git commit -m "feat: add Redis caching for embeddings"
```

### 5. Submitting Pull Requests

1. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues: "Fixes #123"
   - Include screenshots for UI changes
   - Ensure all CI checks pass

3. **PR Requirements**
   - ✅ All tests passing
   - ✅ No TypeScript errors
   - ✅ Code properly formatted
   - ✅ Documentation updated
   - ✅ Clear commit history

### 6. Code Review

- Be respectful and constructive
- Respond to feedback in a timely manner
- Make requested changes in new commits (don't force push during review)
- Mark conversations as resolved after addressing feedback

## Development Guidelines

### TypeScript Best Practices

- Use strict mode (`strict: true` in tsconfig.json)
- Define proper types, avoid `any`
- Use interfaces for object contracts
- Document function parameters

### Performance

- Monitor API response times: `GET /api/metrics`
- Target < 500ms average response time
- Use caching for frequently accessed data
- Optimize database queries

### Security

- Never commit secrets to git
- Validate all user inputs
- Follow OWASP guidelines
- Use environment variables for sensitive data
- Don't expose internal error details to clients

### Testing

- Write tests for all business logic
- Aim for >80% code coverage
- Include edge cases in tests
- Test error handling

## Project Structure

```
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── lib/                   # Shared utilities
│   ├── agents/            # AI agents
│   ├── cache.ts           # Caching system
│   └── analytics.ts       # Analytics tracking
├── prisma/                # Database schema
└── docs/                  # Documentation
```

## Getting Help

- **Questions**: Open a GitHub discussion
- **Issues**: Check existing issues before creating new ones
- **Documentation**: See `docs/` folder for guides

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this project better! 🙏
