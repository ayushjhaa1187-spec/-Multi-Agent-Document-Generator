# Getting Started

This guide will help you get the Multi-Agent Document Generator up and running in minutes.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **PostgreSQL**: v12.0 or higher (local or cloud)
- **Git**: For version control

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Multi-Agent-Document-Generator.git
cd Multi-Agent-Document-Generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Copy the example environment file and update with your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-api-key-here

# Database (use local PostgreSQL or Vercel Postgres)
DATABASE_URL=postgresql://user:password@localhost:5432/brd_generator

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database

Create the database and run migrations:

```bash
npm run db:push
```

This creates all necessary tables in your PostgreSQL database.

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the BRD Generator interface!

## Verify Installation

✅ Application loads at http://localhost:3000
✅ Chat interface is visible
✅ No console errors
✅ Database is connected (check `.env.local`)

## First Project

1. Enter a project name (minimum 3 characters)
2. Click "Continue to Project Details"
3. Describe what you want to build
4. AI agents will ask clarifying questions
5. They generate a complete BRD document

## Common Issues

### "Database connection failed"
- Verify `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running locally
- Check your database credentials

### "API key error"
- Get your OpenAI API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Verify it starts with `sk-`
- Check it has billing enabled

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build errors
```bash
npm run build  # Test build locally
npm test       # Run tests
```

## Next Steps

- Read the [API Reference](./API.md)
- Check out [Architecture](./ARCHITECTURE.md)
- Learn about [Deployment](./DEPLOYMENT.md)
- Review [Development Guide](./DEVELOPMENT.md)

## Getting Help

- **Documentation**: See the `docs/` folder
- **Issues**: Open a GitHub issue
- **Discussions**: Start a GitHub discussion
- **Contributing**: See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Congratulations!** You're ready to start generating business requirement documents. 🚀
