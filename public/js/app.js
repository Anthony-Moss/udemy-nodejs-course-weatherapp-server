console.log('Client side js file is loaded!')


fetch('http://localhost:3001/weather?address=atlanta').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.forecast)
            console.log(data.location)
        }
    })
})