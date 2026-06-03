const express = require("express");
const cors = require("cors");
const pool = require("./database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

app.get("/api/getTrees", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM trees`);

        res.json(result.rows)
    } catch (err){
        console.log('THERE WAS AN ERROR: ' + err);
        res.status(500).json({body: err.message });
    }
});

app.get("/api/getAncestors", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestors`);
        res.json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({body: err.message});
    }
});

app.post('/api/auth/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if(result.rows.length === 0){
            return res.status(401).json({error: 'Username not found'});
        }

        const user = result.rows[0];
        const isValid = password === user.password;
        if(!isValid) {
            return res.status(401).json({error: 'Password is Invalid'});
        }

        const token = jwt.sign({id: user.user_id}, "temporary-secret", { expiresIn: '1h'});
        res.json({ token, user: {id:user.user_id, username: user.username, role: user.role}});
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

app.listen(4000, () => console.log("server on localhost:4000"));
