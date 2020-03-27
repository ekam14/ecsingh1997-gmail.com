const request = require('request')


const forecast = (latitude, longitude, callback) => {
  const queryUrl = latitude + ',' + longitude
  const urlTemp = 'https://api.darksky.net/forecast/eb5d2455b3f9b95a320af49382e3ce94/' + queryUrl + '?units=si'

  const optionsTemp = {
    url: urlTemp,
    json: true
  }

  request(optionsTemp, (error, response) => {
    if(error){
      callback('Unable to connnect to the API', undefined)
    }else if(response.body.error){
      callback('Unable to find location.', undefined);
    }else{
      const summary = response.body.daily.summary
      const temp = response.body.currently.temperature
      const precipProbability =  response.body.currently.precipProbability
      callback(undefined, summary + ' Current temperature is ' + temp + ' celsius and there is a ' + precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast
