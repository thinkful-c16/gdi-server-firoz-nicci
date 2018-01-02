'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const courseData =    require('./data/courses');
const peopleData =    require('./data/people');
const venueData =     require('./data/venues');
const schCourseData = require('./data/scheduledCourses');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);


app.get('/api/courses', (req, res) => {
  res.json(courseData);
});

app.get('/api/people', (req, res) => {  
  res.json(peopleData);
});

app.get('/api/venues', (req, res) => {
  res.json(venueData);
});

app.get('/api/scheduledCourses', (req, res) => {
  res.json(schCourseData);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app};
