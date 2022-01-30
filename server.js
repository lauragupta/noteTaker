const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();

//Middleware for JSON
app.use(express.json());


//GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for note page
app.get('/api/notes',(req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}`)
);

module.exports = app;