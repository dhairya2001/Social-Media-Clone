const express=require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const cors=require("cors");
const app=express();
const postsRoute = require('./routes/postsRoute.js');
const userRoute = require('./routes/userRoute.js');

app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);


app.get('/',(req,res)=>{
    res.status(200).send("welcome to home page")
})
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server started on port " +5000);
    });
})
.catch((error)=>{
    console.log(error)
})



