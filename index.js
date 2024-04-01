const express=require("express");
const app=express();
const dotenv=require('dotenv');
require('dotenv').config()
const connectDB = require('./Database/db.js')
app.use(express.json());
connectDB();


app.use('/add',require('./Routes/AddEvents.js'))
app.use('/location',require('./Routes/FindEvents.js'))

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is Working ");
})