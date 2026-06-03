const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "Cabin1776",
    host: "localhost",
    database: "CantrallEvansAncestry",
    port: 5432
});

module.exports = pool;