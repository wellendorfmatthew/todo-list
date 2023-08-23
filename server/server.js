require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); // Create Express application
const todoRouter = require('./routes/todo');

app.use(cors()); // Allows for interaction between the react and express/node server
app.use(express.json()); // Allows for use of json

app.use('/api/todo', todoRouter);

mongoose.connect(process.env.MONGO_URI) // Connects Express to the MongoDB database
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
            console.log("Connected to MongoDB");
        });
    })
    .catch((error) => {
        console.log(error);
    });