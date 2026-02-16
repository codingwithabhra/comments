const mongoose = require ("mongoose");

require("dotenv").config();

const mongouri = process.env.MONGODB;

const initialisedatabase = async() => {
    await mongoose.connect(mongouri).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("Error connecting to database", error);        
    })
};

module.exports = { initialisedatabase };