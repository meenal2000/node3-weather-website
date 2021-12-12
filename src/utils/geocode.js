const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWVlbmFsMjAwMCIsImEiOiJja3d0OHE1N2owd284Mm9sc3IzMXBnemEzIn0.0Ch0YkuVw2qnu3hFu24zRA&limit=1';
    request({url , json : true} , (error , response) => {
        if(error)
        {
            callback('we can not process the request')
        }
        else if(response.body.message || response.body.features.length === 0 )
        {
            callback('Unable to find location . Try another search.')
        }
        else
            callback(undefined , {
                latitude : response.body.features[0].center[0] ,
                longitude : response.body.features[0].center[1] ,
                location : response.body.features[0].place_name
            })
    })

}

module.exports = geocode