const path = require('path')
const express = require('express')
const hbs = require('hbs')
const pollution = require('./src/utils/pollution')


const app = express()
const port = process.env.PORT || 3000

const pubdpath = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './Templates/views')
const partialsPath = path.join(__dirname, './Templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubdpath))


app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/services', (req, res) => {
    res.render('services')
})

app.get('/team', (req, res) => {
    res.render('team')
})

app.get('/portfolio', (req, res) => {
    res.render('portfolio')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/pollution', (req, res) => {
    if (!req.query.lattitude && !req.query.longitude) {
        return res.send({
            error: 'invalid search'
        })
    }
    pollution(req.query.lattitude, req.query.longitude, (error, pollData, city) => {
        res.send({
            aqius: pollData,
            city: city
        })
    })

    // res.send({
    //     products: []
    // })
})


app.listen(port, () => {
    console.log('server is up on port'+port)
})
