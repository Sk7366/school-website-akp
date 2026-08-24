# Preview Run Doc

## Reproduce uncommitted artifacts

1. Copy `.env.local` from the main checkout if it exists (currently no `.env` files present — the server has a fallback for missing `GEMINI_API_KEY`).
2. Install dependencies:
   ```bash
   cd /Users/saikirtikrishnan/Downloads/project
   npm install
   ```

## Run the dev server

```bash
cd /Users/saikirtikrishnan/Downloads/project
nohup npx tsx server.ts > .freebuff/preview-bd728f51-4da1-4c58-9593-04d5dd600e57.log 2>&1 < /dev/null &
echo "pid=$!"; disown
```

- Server listens on **port 3000** (`http://localhost:3000`).
- Health check: `GET /api/health`.
- Uses Vite middleware in dev mode (no build needed).
- If the background process is reaped by the shell, relaunch via launchd:
  ```bash
  launchctl submit -l com.codebuff.preview -- /tmp/preview-server.sh
  ```
  where `/tmp/preview-server.sh` is:
  ```bash
  #!/bin/bash
  export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
  cd /Users/saikirtikrishnan/Downloads/project
  exec node --import tsx/esm server.ts
  ```
  Cleanup: `launchctl remove com.codebuff.preview`

## Cleanup

```bash
launchctl remove com.codebuff.preview 2>/dev/null
kill $(lsof -ti:3000) 2>/dev/null
```
