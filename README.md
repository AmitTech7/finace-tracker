# Personal Finance Tracker

A modern web application to track and manage your investment portfolio across multiple asset types including stocks, mutual funds, fixed deposits, bonds, and cash.

## Features

- Track multiple investment types (Stocks, Mutual Funds, Fixed Deposits, Bonds, Cash)
- Visual dashboard with portfolio allocation pie chart
- Real-time portfolio value calculation
- Add, edit, and delete investments
- Data persistence across devices using backend API
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- Node.js with Express
- JSON file-based storage
- RESTful API

## Run Locally

### Prerequisites
- Node.js (v18 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-finance-tracker
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   The default configuration uses `http://localhost:3001` for local development.

### Running the Application

You need to run both the backend server and frontend development server:

1. **Start the backend server** (in one terminal):
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:3001

2. **Start the frontend** (in another terminal):
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Open your browser** and navigate to http://localhost:5173

## Deployment

### Deploy Backend (Choose one platform)

#### Option 1: Deploy on Render

1. Create a new account on [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Click "Create Web Service"
6. Copy your backend URL (e.g., `https://your-app.onrender.com`)

#### Option 2: Deploy on Railway

1. Create an account on [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `server`
   - Railway will auto-detect the Node.js environment
5. Deploy and copy your backend URL

### Deploy Frontend (Vercel)

1. Your frontend is already configured for Vercel
2. Go to [Vercel](https://vercel.com) and import your repository
3. Configure environment variables:
   - Add `VITE_API_URL` with your backend URL (from Render/Railway)
   - Example: `https://your-backend.onrender.com`
4. Deploy

### Update Frontend to Use Production Backend

After deploying your backend, update the `.env` file locally or set the environment variable in Vercel:

```env
VITE_API_URL=https://your-backend-url.com
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/investments` - Get all investments
- `GET /api/investments/:id` - Get a specific investment
- `POST /api/investments` - Create a new investment
- `PUT /api/investments/:id` - Update an investment
- `DELETE /api/investments/:id` - Delete an investment
- `GET /health` - Health check endpoint

## Project Structure

```
personal-finance-tracker/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   ├── services/             # API service layer
│   ├── types.ts              # TypeScript type definitions
│   └── App.tsx               # Main application component
├── server/                   # Backend server
│   ├── index.js              # Express server
│   ├── package.json          # Backend dependencies
│   ├── db.json               # JSON database (auto-generated)
│   └── render.yaml           # Render deployment config
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

## Data Structure

Investments are stored with the following structure:

```typescript
interface Investment {
  id: string;
  type: 'Stock' | 'Mutual Fund' | 'Fixed Deposit' | 'Bond' | 'Cash';
  name: string;
  amount: number;
  purchaseDate: string;
  // Type-specific fields...
}
```

## License

MIT
