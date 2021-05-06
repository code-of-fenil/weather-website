const request = require('request')

const geocode = (address,callback) =>{
    
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiZmVuaWxqYWluIiwiYSI6ImNrbnU5ZnhiejBhbmUydmt0dWE1YzB2eHEifQ.UTBdzPpjTpMLcT_7kKaLDw"

    request({url,json : true},(error,response) =>{
        if(error){
            callback('unable to connect to server', undefined)
        }
        else if(response.body.error)
        {
            callback('unable to find location, Try another search', undefined)
        }
        else if(response.body.features.length === 0){
            callback("unable to find lattiude for this position ", undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
        

    })
}

module.exports = geocode