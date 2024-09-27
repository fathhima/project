const express = require('express')

const app = express()

app.use('/',(req,res) => {
    res.send('h')
})

app.use('/test',(req,res) => {
    res.send('hi')
})

app.listen(3000,() => {
    console.log('server is listening on port 3000...')
})