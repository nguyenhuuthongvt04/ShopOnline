// Load environment variables from api.env during development only
// dotenv is not required in production (render/Heroku etc provide env vars)
// install with `npm install dotenv` and add api.env to .gitignore
if (process.env.NODE_ENV !== 'production') {
    try {
        require('dotenv').config({ path: './api.env' });
    } catch (e) {
        console.warn('dotenv not installed, skipping');
    }
}

const path = require("path");
const express = require('express');
const sql = require('./db'); // db.js uses process.env.DATABASE_URL
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname)));

// No need for config here, db.js handles connection via DATABASE_URL

app.get('/products', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM Products`;
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// simple health check to verify DB connection
app.get('/ping', async (req, res) => {
    try {
        await sql`SELECT 1`;
        res.send('pong');
    } catch (err) {
        console.error('DB ping failed', err);
        res.status(500).send('db down');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
require('dotenv').config();  // phải là dòng đầu tiên
// rồi phần còn lại vẫn như trước