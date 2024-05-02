const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Create a route to register
router.post("/", (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    // Save the user to the database
    db.query("INSERT INTO students (username, password) VALUES (?, ?)", [username, password], (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Failed to register user" });
      }
        return res.redirect("/login");
      
    });
  });

module.exports = router;