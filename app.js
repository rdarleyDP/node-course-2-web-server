// Require modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Setup port for heroku and local 
const port = process.env.PORT || 3000;

// Initiate express app
var app = express();

// Register partials for handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// Setup a handlebars helper for the current year
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Home route
app.get('/', (req, res) => {
    var statementCollection = JSON.parse(fs.readFileSync('statements.json'));
    
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        statements: statementCollection
    });
});

// Test route
app.get('/test', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Test page'
    });
});

// Tell express to listen on the chosen port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});