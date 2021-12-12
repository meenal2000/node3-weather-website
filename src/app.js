const express = require('express') // it is a function , and not an object
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
// creating our server using methods provided on the app itself
const app = express()
const port = process.env.PORT || 3000; // for heroku 

// define paths for express config
const publicDirectoryApp = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

// setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryApp)) // helps in customizing the server
// setting up diff routes
// first is an object containg info about incoming request to server
// second is response ( contains some methods which we customize what we want  to send to the server )

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name : 'Meenal'
    })
})

app.get('/about', (req , res) => {
    res.render('about' , {
        title : ' About me',
        name : 'Meenal'
    })
})

app.get('/help', (req , res) => {
    res.render('help' , {
        title : ' Help page',
        message : 'we look for help here',
        name : 'Meenal'
    })
})
app.get('/weather' , (req , res) => {
    if(!req.query.address)
    {
        return res.send({
            error : 'no address provided'
        })
    }
    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if(error)
        {
            return res.send({ error })
        }
        forecast(latitude, longitude , (error , forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                location,
                forecast : forecastData,
                address: req.query.address
            })
        })
    })
    
})



app.get('/help/*' , (req, res) => {
    res.render('404' , {
        title : ' 404',
        name : 'Meenal',
        msg : 'Help article not found'})
})

app.get('*' , (req , res) => {
    res.render('404', {title : ' 404',
    name : 'Meenal',
     msg : 'Page not found'})
})

app.listen(port , () => {
    console.log(' server is up running on port '+port)
})
