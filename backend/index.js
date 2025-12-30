const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow requests from your Vercel frontend
app.use(cors({
    origin: ['http://localhost:1234', 'https://zevpinker.com', 'https://www.zevpinker.com']
}));
app.use(express.json());

// Initialize database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Database error:', err);
    console.log('Connected to SQLite database');
});

// Create table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// POST - Save a new submission
app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    db.run(
        'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// GET - View all submissions
app.get('/api/submissions', (req, res) => {
    db.all('SELECT * FROM submissions ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});