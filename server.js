const express = require('express');
const path = require('path');
const textData = require('./db/db.json')
const uniqid = require('uniqid');
// const { title } = require('process');
const fs = require('fs');
const util = require('util');
// import db from "./Develop/db/db.json";

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

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
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Get route for note page - title
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//fs.readFile - promisified version
readFromFile = util.promisify(fs.readFile);

//writeToFile
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err) =>
    err ? console.error(err) : console.info(`Note written to ${destination}`)
);

//defining readAndAppend
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//Post route for note and title
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} received request to add new note`);

    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title, 
            text,
            noteId: uniqid()
        };

        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.error('Error in adding note');
    }
});

app.listen(port, () =>
    console.log(`App is listening at http://localhost:${port}`)
);

