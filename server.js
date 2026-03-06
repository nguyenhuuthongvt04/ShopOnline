// Load environment variables from api.env (for local development)
// install dotenv (`npm install dotenv`) and ensure api.env is in .gitignore
require('dotenv').config({ path: './api.env' });

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
require('dotenv').config();  // phải là dòng đầu tiên
// rồi phần còn lại vẫn như trước