
const request = require('request')

const forecast= (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=9e0fbd66a98750c0e8bb59b9b4692378&query='+ encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
   
    request({url : url,json: true},(error,response) =>{
        if (error)
        {
            callback('unable to connect because of network',undefined)
        }
        else if(response.body.error){
            callback('Your API request is fail',undefined)
        }
        else{
            callback(undefined,//{
                // Temperature: response.body.current.Temperature,
                // Location: response.body.current.location.region
            //}
            response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out, But it feels like " + response.body.current.feelslike +
            ", humidity is " + response.body.current.humidity + "%. And wind speed is " + response.body.current.wind_speed + ".")

        }
    })
} 
module.exports = forecast