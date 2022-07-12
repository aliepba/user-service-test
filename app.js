require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/tech');
mongoose.connect('mongodb+srv://arise:arise123@clustermawarmerah.do9ydtf.mongodb.net/test?retryWrites=true&w=majority');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const refreshToken = require('./routes/refreshToken');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh-token', refreshToken);

module.exports = app;
