const express = require("express");
const cors = require("cors");
const pool = require("./database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();


/* 
    finds all trees. returns the resulting rows
*/

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

app.get("/api/getDocuments", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestor_info WHERE date_added >= CURRENT_DATE - INTERVAL '7 days'`);
        res.json(result.rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({body: err.message});
    }
});

app.get("/api/getAncestorDocuments/:ancestor_id", async (req, res) => {
    const {ancestor_id} = req.params;
    try {
        const result = await pool.query(`SELECT * from ancestor_info WHERE ancestor_id = $1`, [ancestor_id]);
        res.json(result.rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({body: err.message});
    }
});

app.get("/api/getAncestorInfo", async(req, res) =>{
    const { ancestor_id } = req.params;
});

app.get("/api/getUsers", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.json(result.rows);
    } catch (err){
        console.log(err);
        res.status(500).json({body: err.message});
    }
});


app.get("/api/getRelationships/:tree_id", async (req,res) => {
    const { tree_id } = req.params;
    try {
        const ancestors = await pool.query(
            `
            SELECT a.*
            FROM ancestors AS a
            JOIN tree_members AS tm ON a.ancestor_id = tm.ancestor_id
            WHERE  tm.tree_id = $1
            `
        , [tree_id]);

        const relationships = await pool.query(
            `
            SELECT r.*
            FROM relationships AS r
            JOIN tree_members AS tm ON r.ancestor_id = tm.ancestor_id
            WHERE tm.tree_id = $1
            `
        , [tree_id]);

        res.json({ ancestors: ancestors.rows, relationships: relationships.rows});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({body: err.message});
    }
});

app.post('/api/auth/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if(result.rows.length === 0){
            return res.status(401).json({error: 'Username not found'});
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);


        if(!isValid) {
            return res.status(401).json({error: 'Password is Invalid'});
        }

        const token = jwt.sign({id: user.user_id}, "temporary-secret", { expiresIn: '1h'});
        res.json({ token, user: {id:user.user_id, username: user.username, role: user.role}});
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

app.post('/api/addUser', async (req,res) => {
    const {username, password, role} = req.body;
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query('INSERT INTO users (username, password, role) VALUES ($1,$2,$3) RETURNING *', [username, hashedPassword, role]);
        res.status(201).json(result.rows[0]);
    } catch(err){
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.post('/api/editDocument', async (req, res) => {
    const {filename, filepath, ancestor_id, info_id} = req.body;

    try{
        const response = await pool.query('UPDATE ancestor_info SET filename = $1, filepath = $2, ancestor_id = $3 WHERE info_id = $4', [filename, filepath, ancestor_id, info_id]);
        res.status(201).json({message: 'Document edited'});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.post('/api/addDocument', async (req, res) => {
    const {filepath, filename, ancestor_id} = req.body;

    try{
        const response = await pool.query('INSERT INTO ancestor_info (filepath, filename, ancestor_id, date_added) VALUES ($1, $2, $3, NOW())', [filepath, filename, ancestor_id]);
        res.status(201).json({message: 'Document Added'});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
})

app.delete('/api/deleteDocument/:info_id', async(req, res) => {
    const {info_id} = req.params;

    try{
        const response = await pool.query('DELETE FROM ancestor_info WHERE info_id = $1', [info_id]);
        res.status(201).json({message: 'Document Deleted'});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.delete('/api/deleteUser/:user_id', async (req, res) => {
    const {user_id} = req.params;

    try{
        const response = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        res.status(201).json({message: 'User deleted'});
    } catch (err){
        console.log(err.message);
        res.status(401).json({error: err.message});
    }
})

app.listen(4000, () => console.log("server on localhost:4000"));
