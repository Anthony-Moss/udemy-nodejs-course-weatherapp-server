
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diectory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)  => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anthony Moss'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Site",
        name: 'Anthony Moss'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: "Enter your city at /weather to get local weather info"
    })
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Atlanta'
    })
});

app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
});