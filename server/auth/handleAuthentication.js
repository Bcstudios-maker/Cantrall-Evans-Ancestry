const jwt = require('jsonwebtoken');


app.post('/api/auth/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if(result.rows.length === 0){
            return res.status(404).json({error: 'Username not found'});
        }

        const user = result.rows[0];
        const isValid = await
    }
});