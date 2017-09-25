const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    var statementCollection = JSON.parse(fs.readFileSync('statements.json'));
    
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        statements: statementCollection
    });
});

app.get('/test', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Test page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});