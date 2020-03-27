const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// telling the app to use hbs as view engine i.e. template
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')

// setting up hbs partials
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// setting app to use static assets from public folder, will also make public as server's root
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    text: 'Check your weather',
    name: 'Ekam'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    text: 'About me',
    name: 'Ekam'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    text: 'This is some helpful text',
    name: 'Ekam'
  })
})

app.get('/weather', (req, res) => {
  console.log(req.query.address);
  if(!req.query.address){
    return res.send({
      error: 'No address was provided'
    });
  }
  geocode(req.query.address, (error, data) => {
    if(error){
      return res.send({
        error: error
      });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address
      });

    })
  })

})

app.get('*', (req, res) => {
  res.render('error', {
    title: 404,
    name: 'Ekam',
    error: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})
