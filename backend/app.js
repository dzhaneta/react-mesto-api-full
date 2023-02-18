require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('connected'))
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT);
