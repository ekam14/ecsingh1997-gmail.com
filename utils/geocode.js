const request = require('request')

const geocode = (location, callback) => {
  location = encodeURIComponent(location)
  const urlGeocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiZWthbTE0IiwiYSI6ImNrODhybThobjBhbWgzaW1xeW80bms4aWgifQ.A8Y44bhJv3hDyL9OPHrhVw&limit=1'

  const optionsGeocode = {
    url: urlGeocode,
    json: true
  }

  request(optionsGeocode, (error, response) => {
    if(error){
      callback('Unable to connnect to the API', undefined)
    }else if(response.body.features.length === 0){
      callback('Unable to find location.', undefined);
    }else{
      const longitude = response.body.features[0].center[0]
      const latitude = response.body.features[0].center[1]
      const location = response.body.features[0].place_name
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location
      })
    }
  })
}

module.exports = geocode
