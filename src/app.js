
const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)  => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anthony Moss'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page"
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Atlanta'
    })
})

app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
})