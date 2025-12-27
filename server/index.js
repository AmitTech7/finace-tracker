import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
async function initDB() {
  try {
    await fs.access(DB_FILE);
  } catch {
    const initialData = {
      investments: [
        {
          id: "1",
          type: "Stock",
          name: "Reliance Industries",
          ticker: "RELIANCE",
          amount: 150000,
          purchaseDate: "2023-01-15",
          shares: 50
        },
        {
          id: "2",
          type: "Mutual Fund",
          name: "SBI Bluechip Fund",
          fundHouse: "SBI",
          amount: 250000,
          purchaseDate: "2022-11-20",
          units: 1000
        },
        {
          id: "3",
          type: "Fixed Deposit",
          name: "HDFC FD",
          bank: "HDFC Bank",
          amount: 500000,
          purchaseDate: "2023-03-10",
          interestRate: 7.5,
          maturityDate: "2024-03-10"
        },
        {
          id: "4",
          type: "Bond",
          name: "Government Bond 2030",
          issuer: "Government of India",
          amount: 100000,
          purchaseDate: "2023-06-01",
          couponRate: 7.2,
          maturityDate: "2030-06-01"
        },
        {
          id: "5",
          type: "Cash",
          name: "Emergency Fund",
          currency: "INR",
          amount: 50000,
          purchaseDate: "2023-01-01",
          location: "Savings Account"
        }
      ]
    };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('Database initialized with sample data');
  }
}

// Read database
async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { investments: [] };
  }
}

// Write database
async function writeDB(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
}

// GET all investments
app.get('/api/investments', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.investments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
});

// GET single investment
app.get('/api/investments/:id', async (req, res) => {
  try {
    const db = await readDB();
    const investment = db.investments.find(inv => inv.id === req.params.id);
    if (investment) {
      res.json(investment);
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investment' });
  }
});

// POST new investment
app.post('/api/investments', async (req, res) => {
  try {
    const db = await readDB();
    const newInvestment = req.body;

    // Generate ID if not provided
    if (!newInvestment.id) {
      newInvestment.id = Date.now().toString();
    }

    db.investments.push(newInvestment);
    await writeDB(db);
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create investment' });
  }
});

// PUT update investment
app.put('/api/investments/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.investments.findIndex(inv => inv.id === req.params.id);

    if (index !== -1) {
      db.investments[index] = { ...req.body, id: req.params.id };
      await writeDB(db);
      res.json(db.investments[index]);
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update investment' });
  }
});

// DELETE investment
app.delete('/api/investments/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.investments.findIndex(inv => inv.id === req.params.id);

    if (index !== -1) {
      const deleted = db.investments.splice(index, 1);
      await writeDB(db);
      res.json(deleted[0]);
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete investment' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize and start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
