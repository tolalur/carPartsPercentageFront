const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('src/index.html')
let app = express()

app.use(
    '/api',
    proxy({
        target: 'http://localhost:3000'
    })
)

console.log('process.env.PORT :', process.env.PORT);
app.listen(1234);