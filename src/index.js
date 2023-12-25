const express = require('express');
const mongoose = require('mongoose')
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');

// static file
app.use(express.static("public"));


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // check if the user already exists in the database
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different Username");
    }else{
        // hash the password before storing it to the database
        const saltRounds = 10; // Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }

        // compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home");
        }else{
            res.send("wrong password")
        }
    } catch (error) {
        res.send("wrong Details")
    }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on Port ${port}`));