const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// databases
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 
    
    
    
    extended: true }));
app.use(bodyParser.json());

// cors config
var whitelist = ['http://localhost:3000'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors());

// routes middlewares
readdirSync('./src/routes').map((r) =>
    app.use('/api', require('./src/routes/' + r)),
);

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
});
