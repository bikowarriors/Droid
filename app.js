const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 4321	;
const students = require("./api/students");
const login = require("./api/login");
const register = require("./api/register");
const path = require("path");

//create a instance of the express framework
const app = express();

//middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api/students",students);
app.use("/api/login",login);
app.use("/api/register",register);

//default route
app.get("/",(req,res)=>{
	//res.send("hello world");
	res.render("index.html");
});

//login route
app.get("/login",(req,res)=>{
	res.sendFile(path.join(__dirname, "public", "login.html"));
});

//register route
app.get("/register", (req,res) =>{
	res.sendFile(path.join(__dirname,"public","register.html"));
});

app.listen(port,()=>{
	console.log(`listening at port ${port}`);
});


