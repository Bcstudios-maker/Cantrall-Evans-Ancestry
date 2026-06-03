const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/getTrees", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM trees`);

        res.json(result.rows)
    } catch (err){
        console.log('THERE WAS AN ERROR: ' + err);
        res.status(500).json({body: err.message });
    }
})

app.get("/api/getAncestors", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestors`);
        res.json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({body: err.message});
    }
})


app.listen(4000, () => console.log("server on localhost:4000"));