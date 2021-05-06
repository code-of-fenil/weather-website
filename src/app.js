const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express config
const publicDirectoryPath = (path.join(__dirname,'../public'))
const viewsPath =(path.join(__dirname,'../templates/views'))
const partialPath= (path.join(__dirname, '../templates/partials'))

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setuping handlebar engines and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Fenil Jain'  
    })
})
app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Fenil Jain'
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        messege: 'This is a help page ',
        title: 'Help',
        name: 'Fenil Jain'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query)
    // res.send({
    //     temperature : 39,
    //     feelslike: 35,
    //     location: " India Ahmedabad",
    //     address: req.query.address
    // })
})
app.get('/products',(req, res) =>{
    if (!req.query.search){
        return res.send({
            error:'you must provide search item'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        title: '404',
        errormsg: 'help article not found',
        name: 'Fenil Jain'
    })
})
app.get('*',(req, res) =>{
    res.render('404',{
        title: '404',
        errormsg: 'page not found',
        name: 'Fenil Jain'
    })
})
app.listen(3000, ()=>{
    console.log('server is online on port 3000  ')
})

