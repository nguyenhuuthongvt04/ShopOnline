const path = require("path");
const express = require('express');
const sql = require('./db');
const cors = require("cors");

 const app = express();
 app.use(cors());


app.use(express.static(path.join(__dirname)));
 const config = {
    server: "localhost\\SQLEXPRESS",
    database: "ShopOnline",
    options: {
        trustedConnection: true
    },
    authentication: {
        type: "default",
    }
};
app.get('/products', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (err) {
        res.send(err);
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
 