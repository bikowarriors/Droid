const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const router = express.Router()

const db = mysql.createPool({
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PASSWORD,
	database:process.env.DB_NAME,
});


//create a route to login
router.post("/", (req, res) => {
	const { username, password } = req.body;
  
	const sql = "SELECT * FROM students WHERE username = ? AND password = ?";
	db.query(sql, [username, password], (err, result) => {
	  if (err) {
		 console.error("Error query db", err);
		 return res.status(500).json({ error: "Internal server error" });
	  }
  
	  if (result.length === 0) {
		return res.status(401).json({ error: "Invalid username or password" });
	  }
  
	  return res.redirect("/");
	});
  });

module.exports = router