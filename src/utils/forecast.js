const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=cEWH96l6vPpeH7InTwKqrfbIks6l30oj&q="+latitude+"%2C"+longitude+"&language=en-us&details=true&toplevel=true";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather servicehhh!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const key = body.Key;
            //console.log(key)
            const newurl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/"+key+"?apikey=cEWH96l6vPpeH7InTwKqrfbIks6l30oj&language=en-us&details=true&metric=false";
            request( { url: newurl, json: true } , (error,  body) => {
                if (error) {
                    callback('Unable to connect to weather service!', undefined)
                } else if (body.statusCode===400 || body.statusCode===503) {
                   // callback(body , undefined)
                   callback("LocationKey is invalid: undefined", undefined )
               } 
                else {
                 //callback(undefined , body)
                  callback( undefined , body.body.DailyForecasts[0].Day.IconPhrase + '. ' + body.body.DailyForecasts[0].Day.LongPhrase +'. It is currently '+body.body.DailyForecasts[0].Temperature.Maximum.Value+' Farenheit .')
                }
            })
            //callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast