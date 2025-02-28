
# Connecting Supabase to VS Code

This guide will help you set up the Supabase integration with VS Code for better collaboration and code sharing.

## Prerequisites

1. Make sure you have Node.js and npm installed
2. Install the Supabase CLI globally:
   ```
   npm install -g supabase
   ```

## Setup Steps

### 1. Install VS Code Extensions

Install these VS Code extensions:
- Supabase (by Supabase)
- PostgreSQL (by Chris Kolkman)

### 2. Link Your Supabase Project

1. Open terminal in VS Code and run:
   ```
   supabase login
   ```

2. Follow the prompts to authenticate with your Supabase account

3. Link your local project to your Supabase project:
   ```
   supabase link --project-ref mfxlprqblsrrihkiotcy
   ```

4. Create a `.env.local` file in your project root with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://mfxlprqblsrrihkiotcy.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meGxwcnFibHNycmloa2lvdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzY1ODcsImV4cCI6MjA1NTc1MjU4N30.MbS5fszanWYDu-Zrmxgq52-twoQdW4FQx9nBh9OTfdI
   ```

### 3. Using Supabase in VS Code

After setting up, you can:

1. View and edit your database schema
2. Run SQL queries directly from VS Code
3. Manage database migrations
4. Deploy Edge Functions
5. Share your database structure with collaborators

### 4. Collaborative Features

For team collaboration:

1. Export your database schema:
   ```
   supabase db dump -f schema.sql
   ```

2. Share the schema.sql file with your team members

3. For real-time collaboration, consider setting up a shared development database instance

### 5. VS Code-specific Tools

- Use the Supabase extension's sidebar to browse your tables
- Write and execute queries in .sql files with the PostgreSQL extension
- View and edit data directly in VS Code's table viewer

## Troubleshooting

If you encounter issues:

1. Ensure your Supabase CLI is up to date:
   ```
   npm update -g supabase
   ```

2. Verify your authentication: 
   ```
   supabase projects list
   ```

3. Check your project reference ID in supabase/config.toml

For more help, visit the Supabase documentation or contact support.
