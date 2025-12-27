# Quick Setup Guide

## First Time Setup

1. **Install dependencies for both frontend and backend:**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run server:install
```

2. **Configure environment:**

```bash
# Copy the environment example file
cp .env.example .env
```

The default `.env` is already configured for local development with `VITE_API_URL=http://localhost:3001`

## Running the Application Locally

You need to run **TWO terminals** simultaneously:

### Terminal 1: Start the Backend Server

```bash
npm run server
```

You should see: `Server running on port 3001`

### Terminal 2: Start the Frontend

```bash
npm run dev
```

You should see the Vite dev server running on `http://localhost:5173`

### Open the App

Navigate to http://localhost:5173 in your browser.

## Troubleshooting

### Port 3001 already in use

If you see an error about port 3001 being in use:

```bash
# Kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Then restart the server
npm run server
```

### API connection errors

Make sure:
1. The backend server is running on port 3001
2. The `.env` file has `VITE_API_URL=http://localhost:3001`
3. Both servers are running simultaneously

### Changes not reflecting

For backend changes, restart the server (Ctrl+C and `npm run server` again)
For frontend changes, Vite hot reload should work automatically

## What's Next?

Once you have it running locally:

1. Add/edit/delete investments to test the functionality
2. Check that data persists when you refresh the page
3. Follow the deployment guide in [README.md](README.md) to deploy online

## Data Storage

- **Local development**: Data is stored in `server/db.json`
- **Production**: Data will be stored on your deployed backend server

The initial database comes with 5 sample investments. You can delete these and add your own data.
