
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3001

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
        message: "Enter your city at /weather to get local weather info",
        name: 'Anthony Moss'
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return  res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'Help Page not Found',
        name: 'Anthony Moss'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Anthony Moss'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});