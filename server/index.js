const express = require('express');
const pino = require('express-pino-logger')();

const config = require('./config');
const path = require('path');

const ImageRouter = require('./routes/image');

// importing mongoose to create module for mongo connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true });

// connect to the database
connect.then((db) => {
  var db = mongoose.connection;
  console.log(`connected to database: ${db.name}`);
}, (err) => console.log(err));

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
  return next();
});

app.use('/uploads', express.static('uploads'));

app.use(pino);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', ImageRouter);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
});

app.listen(config.port, () =>
  console.log(`Express server is running on localhost:${config.port}`)
);