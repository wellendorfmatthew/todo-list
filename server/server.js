const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); // Create Express application
const PORT = process.env.PORT || 5000;
//const HOST = process.env.DB_Host || '27017';
//const dbURI = `mongodb://${HOST}/to-do`;

mongoose.connect('mongodb://localhost:27017/to-do', { // Connects Express to the MongoDB database
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

// Display when database is connected, theres an error, or a disconnect
mongoose.connection.on('connected', () => { 
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', err => {
    console.log('Error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.use('/', (req, res, next) => {
    console.log('This works');
    next();
});

app.get('/todo');

app.post('/todo');

app.put('/todo');

app.delete('/todo');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});