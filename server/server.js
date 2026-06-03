const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

export const getTrees = async () => {
    app.get("/getTrees", (req, res) => {
        pool.query(`SELECT * FROM trees`).then((response) => {
            console.log(response);
        })
    })
}
export const searchAncestors = async () => {
    app.get("/")
}
app.listen(4000, () => console.log("server on localhost:4000"));