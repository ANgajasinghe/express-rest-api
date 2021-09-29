const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const {errorLogger, errorResponder, invalidPathHandler} = require("./core/middleware");
const jwt = require('express-jwt');


const app = express();

app.use(jwt({secret: process.env.SECRECT, algorithms: ['HS256']})
    .unless(
        {
            path: [
                '/oauth/login',
                '/oauth/register'
            ]
        }));

// utils
app.use(bodyParser.json());
app.use(cors());


app.use(express.urlencoded({
    extended: true
}));

// db config

// connect to mongo
// const connection = mongoose.createConnection(process.env.MONGO_CONNECTION_STRING);
// connection.on('connected', () => {
//     console.log('connected to mongodb');
// });
// connection.on('disconnected', () => {
//     console.log('connection disconnected');
// });
// connection.on('error', () => {
//     console.log('connection has error');
// });


const uri = process.env.MONGO_CONNECTION_STRING

mongoose.connect(uri).then(() => {
    console.log(`Server is running on port`)
}).catch((error) => {
    console.error(error)
})


// route reg
app.use('/api', require('./routes/group.route'));
app.use('/oauth', require('./routes/user.route'));


// middleware
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

app.listen(3000);
