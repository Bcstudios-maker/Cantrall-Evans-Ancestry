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
    } catch (err) {
        console.log('THERE WAS AN ERROR: ' + err);
        res.status(500).json({ body: err.message });
    }
});

app.get("/api/getAncestors", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestors`);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.post('/api/addAncestor', async (req, res) => {
    const { firstName, lastName, dob, dod, imageLink, gender, relationType, ancestorId, spouseAncestorId } = req.body;

    try {
        const Ancestor = await pool.query(`INSERT INTO ancestors (first_name, last_name, date_of_birth, date_of_death, ancestor_image, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ancestor_id`, [firstName, lastName, dob, dod, imageLink, gender]);
        const newAncestorId = Ancestor.rows[0].ancestor_id;
        const Relationship = await pool.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [ancestorId, newAncestorId, relationType]);
        if (spouseAncestorId) {
            let newRelationType = null;
            if (relationType === 'father') {
                newRelationType = 'father';
            } else {
                newRelationType = 'mother';
            }
            const spouseRelationship = await pool.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [spouseAncestorId, newAncestorId, newRelationType]);
        }
        res.status(201).json({ message: 'Successfully added ancestor' });
    } catch (err) {
        res.status(500).json({ body: err.message });
    }
});

/*

All Tree api calls

*/

app.get('/api/getTrees', async (req, res) => {
    try {
        const result = await pool.query(`select * from trees`);
        res.json(result.rows);
        res.status(200).json({body: 'Succesfully retrieved trees'});
    } catch (err) {
        resl.status(500).json({ body: err.message})
    }

});



app.delete('/api/deleteAncestor/:ancestor_id', async (req, res) => {
    const { ancestor_id } = req.params;
    try {
        const resultRelationships = await pool.query(`DELETE FROM relationships WHERE ancestor_id = $1 OR relation_id = $1`, [ancestor_id]);
        const resultAncestor = await pool.query(`DELETE FROM ancestors WHERE ancestor_id = $1 `, [ancestor_id]);

        res.status(201).json({ message: 'Succesfully deleted ancestor' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.post('/api/editAncestor/:ancestor_id', async (req, res) => {

    console.log(req.params);
    console.log(req.body);
    const { ancestor_id } = req.params;

    const { imageLink, firstName, lastName, dob, dod } = req.body;

    try { 
        const result = await pool.query(`UPDATE ancestors SET first_name = $1, last_name = $2, date_of_birth = $3, date_of_death = $4, ancestor_image = $5 WHERE ancestor_id = $6`, [firstName, lastName, dob, dod, imageLink, ancestor_id]);
        console.log(result);
        res.status(200).json({ message: 'Edited Ancestor successfully.'});
    } catch (err) {
        res.status(500).json({body: err.message});
    }
})

app.get("/api/getDocuments", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestor_info WHERE date_added >= CURRENT_DATE - INTERVAL '7 days'`);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.get("/api/getAncestorDocuments/:ancestor_id", async (req, res) => {
    const { ancestor_id } = req.params;
    try {
        const result = await pool.query(`SELECT * from ancestor_info WHERE ancestor_id = $1`, [ancestor_id]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.get("/api/getAncestorInfo", async (req, res) => {
    const { ancestor_id } = req.params;
});

app.get("/api/getUsers", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});


app.get("/api/getRelationships/:tree_id", async (req, res) => {
    const { tree_id } = req.params;
    try {
        const ancestors = await pool.query(
            `
            SELECT a.*
            FROM ancestors AS a

            `
        );

        const relationships = await pool.query(
            `
            SELECT r.*
            FROM relationships AS r

            `
        );

        res.json({ ancestors: ancestors.rows, relationships: relationships.rows });

    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Username not found' });
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);


        if (!isValid) {
            return res.status(401).json({ error: 'Password is Invalid' });
        }

        const token = jwt.sign({ id: user.user_id }, "temporary-secret", { expiresIn: '1h' });
        res.json({ token, user: { id: user.user_id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/addUser', async (req, res) => {
    const { username, password, role } = req.body;
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query('INSERT INTO users (username, password, role) VALUES ($1,$2,$3) RETURNING *', [username, hashedPassword, role]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/editDocument', async (req, res) => {
    const { filename, filepath, ancestor_id, info_id } = req.body;

    try {
        const response = await pool.query('UPDATE ancestor_info SET filename = $1, filepath = $2, ancestor_id = $3 WHERE info_id = $4', [filename, filepath, ancestor_id, info_id]);
        res.status(201).json({ message: 'Document edited' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/addDocument', async (req, res) => {
    const { filepath, filename, ancestor_id } = req.body;

    try {
        const response = await pool.query('INSERT INTO ancestor_info (filepath, filename, ancestor_id, date_added) VALUES ($1, $2, $3, NOW())', [filepath, filename, ancestor_id]);
        res.status(201).json({ message: 'Document Added' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
})

app.delete('/api/deleteDocument/:info_id', async (req, res) => {
    const { info_id } = req.params;

    try {
        const response = await pool.query('DELETE FROM ancestor_info WHERE info_id = $1', [info_id]);
        res.status(201).json({ message: 'Document Deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/deleteUser/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const response = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        res.status(201).json({ message: 'User deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ error: err.message });
    }
})

app.listen(4000, () => console.log("server on localhost:4000"));
