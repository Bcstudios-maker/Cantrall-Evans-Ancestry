const express = require("express");
const cors = require("cors");
const pool = require("./database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

/**
 * All Specific Ancestor Queries (Being queries that are done to add, edit, retrieve, or delete one ancestor rather than look at a whole tree.)
 */

app.post('/api/addAncestor', async (req, res) => {

    const { tree_id, firstName, lastName, dob, dod, imageLink, gender, relationType, ancestor } = req.body;

    console.log(firstName, lastName, dob, dod, imageLink, gender, relationType, ancestor);

    if (!tree_id) {
        return res.status(400).json({ message: 'Missing Tree ID' });
    }
    if (!firstName || !lastName || !gender) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!relationType) {
        return res.status(400).json({ message: 'Missing required field relation_type' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const ancestorResult = await client.query(`INSERT INTO ancestors (first_name, last_name, date_of_birth, date_of_death, ancestor_image, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ancestor_id`, [firstName, lastName, dob, dod, imageLink, gender]);

        const newAncestorId = ancestorResult.rows[0].ancestor_id;

        // pcr : parent -> child relationship
        // cpr : child -> parent relationship
        // ssr : spouse -> spouse relationship

        switch (relationType) {
            case "parent":
                const pcr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [newAncestorId, ancestor.ancestor_id, relationType]);
                const cpr2 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [ancestor.ancestor_id, newAncestorId, 'child']);
                console.log(pcr1, cpr2);
                break;
            case "child":
                if (ancestor.spouse) {
                    try {
                        const pcr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [ancestor.ancestor_id, newAncestorId, 'parent']);
                        const pcr2 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [ancestor.spouse.ancestor_id, newAncestorId, 'parent']);
                        const cpr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [newAncestorId, ancestor.ancestor_id, relationType]);
                        const cpr2 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [newAncestorId, ancestor.spouse.ancestor_id, relationType]);
                        console.log(`cpr1: ${cpr1}, cpr2: ${cpr2}, pcr1: ${pcr1}, pcr2: ${pcr2}`);
                    } catch (err) {
                        return res.status(400).json({ message: 'Could not create parent <-> child relationships ' + err.message });
                    }
                } else {
                    return res.status(400).json({ message: 'Immaculate conception is only possible for God.' });
                }
                break;
            case "spouse":
                const ssr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [newAncestorId, ancestor.ancestor_id, relationType]);
                const ssr2 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3)`, [ancestor.ancestor_id, newAncestorId, relationType]);

                if (ancestor.children) {

                    const children = await client.query(`
                        select distinct a.first_name, a.last_name, a.date_of_birth, a.date_of_death, a.gender, r.ancestor_id, r.relation_id, r.relation_type
                        from ancestors as a, relationships AS r
                        where (a.ancestor_id = 23 AND r.ancestor_id = 23) AND r.relation_type = 'parent' 
                    `);

                    const result = children.rows;

                    try {
                        result.forEach(async (child) => {
                            const pcr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3) RETURNING *`, [newAncestorId, child.relation_id, 'parent']);
                            const cpr1 = await client.query(`INSERT INTO relationships (ancestor_id, relation_id, relation_type) VALUES ($1, $2, $3) RETURNING *`, [child.relation_id, newAncestorId, 'child']);
                        });
                    } catch (err) {
                        return res.status(400).json({ message: 'Unable to make parent <-> child relationship for new spouse.' });
                    }

                }
                break;
            default:
                console.log('No known relation type.');
                break;
        }

        //No matter what a new ancestor will be added to a tree.
        await client.query(`INSERT INTO tree_members (tree_id, ancestor_id) VALUES ($1, $2)`, [tree_id, newAncestorId]);

        await client.query(`COMMIT`);
        return res.status(201).json({ message: 'Added relationship' });
    } catch (err) {
        await client.query(`ROLLBACK`);
        return res.status(500).json({ message: err.message });
    } finally {
        client.release();
    }
});

app.delete('/api/deleteAncestor/:ancestor_id', async (req, res) => {
    const { ancestor_id } = req.params;
    try {
        await pool.query(`DELETE FROM tree_members WHERE ancestor_id = $1`, [ancestor_id]);
        await pool.query(`DELETE FROM relationships WHERE ancestor_id = $1 OR relation_id = $1`, [ancestor_id]);
        await pool.query(`DELETE FROM ancestors WHERE ancestor_id = $1 `, [ancestor_id]);

        res.status(201).json({ message: 'Succesfully deleted ancestor' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
    }
});

app.post('/api/editAncestor/:ancestor_id', async (req, res) => {


    const { ancestor_id } = req.params;

    const { imageLink, firstName, lastName, dob, dod } = req.body;

    try {
        const result = await pool.query(`UPDATE ancestors SET first_name = $1, last_name = $2, date_of_birth = $3, date_of_death = $4, ancestor_image = $5 WHERE ancestor_id = $6`, [firstName, lastName, dob, dod, imageLink, ancestor_id]);
        res.status(200).json({ message: 'Edited Ancestor successfully.' });
    } catch (err) {
        res.status(500).json({ body: err.message });
    }
})

app.get("/api/getLocalAncestors/:ancestor_id", async (req, res) => {
    const { ancestor_id } = req.params;

    try {
        const relationshipResult = await pool.query(`SELECT * from relationships where ancestor_id = $1`, [ancestor_id]);
        const ancestorResult = await pool.query(`SELECT * from ancestors`);

        res.json({ ancestors: ancestorResult.rows, relationships: relationshipResult.rows });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

/*

All Tree Queries

*/

app.get('/api/getTrees', async (req, res) => {
    try {
        const result = await pool.query(`select * from trees`);
        res.json(result.rows);
        res.status(200).json({ body: 'Succesfully retrieved trees' });
    } catch (err) {
        res.status(500).json({ body: err.message })
    }

});

app.get('/api/getAncestorsInTree/:tree_id', async (req, res) => {
    const { tree_id } = req.params;
    try {
        const ancestors = await pool.query(
            `
            SELECT * 
            FROM ancestors AS a
            JOIN tree_members AS tm ON a.ancestor_id = tm.ancestor_id
            WHERE tm.tree_id = $1
            `
            , [tree_id]);
        const relationships = await pool.query(
            `
            SELECT * 
            FROM relationships AS r
            JOIN tree_members AS tm ON r.ancestor_id = tm.ancestor_id
            WHERE tm.tree_id = $1
            `
            , [tree_id]);

        res.json({ ancestors: ancestors.rows, relationships: relationships.rows });
    } catch (err) {
        res.status(500).json({ body: err.message });
    }
});

app.get("/api/getRelationships", async (req, res) => {
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

/**
 *  All User queries
 */

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

app.delete('/api/deleteUser/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const response = await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
        res.status(201).json({ message: 'User deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ error: err.message });
    }
});

/**
 * All Document queries.
 */

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

app.post('/api/editDocument', async (req, res) => {
    const { filename, filepath, ancestor_id, info_id } = req.body;

    try {
        const response = await pool.query('UPDATE ancestor_info SET filename = $1, filepath = $2, ancestor_id = $3 WHERE info_id = $4', [filename, filepath, ancestor_id, info_id]);
        res.status(201).json({ message: 'Document edited' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/getDocuments", async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ancestor_info WHERE date_added >= CURRENT_DATE - INTERVAL '7 days'`);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ body: err.message });
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


app.listen(4000, () => console.log("server on localhost:4000"));
