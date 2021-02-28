const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();
const port = process.env.PORT || 8000;

// databases
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors());

app.get('/api', (req, res) => {
    res.send({
        data: "hey u hit node API"
    })
});

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
});