const request = require('request')

// const  weatherUrl = 'https://api.darksky.net/forecast/5ff7d44666836f47201faa8a389d0db4/37.8267,-122.4233'

// request({ url: weatherUrl, json: true }, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.currently)
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location input!')
//     } else {
//         console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} % chance of rain`)
//     }
// })

const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/5ff7d44666836f47201faa8a389d0db4/${lat},${long}`
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to  find location!')
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast