const Bundler = require('parcel-bundler');
const express = require('express');
const proxy = require('http-proxy-middleware');

let bundler = new Bundler('./index.html')
let app = express();

app.use(
    '/api/:detailNumber',
    proxy({ target: 'http://localhost:3000', changeOrigin: true })
)

app.use('/', bundler.middleware());

app.listen(1234);