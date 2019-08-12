const request = require('request')

const geocode = (address, callback) => {
    const encodedURI = encodeURIComponent(address)
    const url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedURI}.JSON?access_token=pk.eyJ1Ijoic3dpZnRtYXBsZSIsImEiOiJjanRjNjZyNGEwaGN1M3lxandlbzRnbGQ5In0.EWCNMHBKSS6VY6o5UFh6Ew&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length ===  0) {
            callback('Unable to find location!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode