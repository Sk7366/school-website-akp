# Preview Run Doc

## Reproduce uncommitted artifacts

1. Copy `.env.local` from the main checkout if it exists (currently no `.env` files present — the server has a fallback for missing `GEMINI_API_KEY`).
2. Install dependencies:
   ```bash
   cd /Users/saikirtikrishnan/Downloads/project
   npm install
   ```
3. Build for production (required — the Vite dev server process gets reaped by macOS launchd):
   ```bash
   cd /Users/saikirtikrishnan/Downloads/project
   npx vite build
   ```

## Run the server

### Method: launchctl submit (recommended — survives shell exits)

```bash
# Create the startup script
cat > /tmp/akp-start.sh << 'HEREDOC'
#!/bin/bash
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
export NODE_ENV=production
export NODE_PATH="/Users/saikirtikrishnan/Downloads/project/node_modules"
cd /Users/saikirtikrishnan/Downloads/project
exec /usr/local/bin/node --import tsx/esm server.ts
HEREDOC
chmod +x /tmp/akp-start.sh

# Submit via launchd
launchctl remove com.codebuff.preview 2>/dev/null
launchctl submit -l com.codebuff.preview -- /tmp/akp-start.sh
```

- Server listens on **port 3000** (`http://localhost:3000`).
- Health check: `GET /api/health`.
- Uses `NODE_ENV=production` to serve built `dist/` files (no Vite middleware needed).
- **Important:** The Vite dev server (`npx tsx server.ts` without `NODE_ENV=production`) starts successfully but the process gets reaped by macOS within seconds. The production build is stable.

## Cleanup

```bash
launchctl remove com.codebuff.preview 2>/dev/null
```
