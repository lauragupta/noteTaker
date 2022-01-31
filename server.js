const express = require('express');
const path = require('path');
const textData = require('./db/db.json')
const uniqid = require('uniqid');
const { title } = require('process');
// const fs = require('fs');
// import db from "./Develop/db/db.json";

const PORT = 3001;

const app = express();

//Middleware for JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));

//GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//GET route for note page - notes
app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
//Get route for note page - title
app.get('/api/notes', (req, res) => res.json(textData));

app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
);

module.exports = app;