'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const JSONParser = bodyParser.json();

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
const { CourseModel, PersonModel, VenueModel, ScheduledCourseModel } = require('./models');
// const {dbConnect} = require('./db-knex');
//const courseData =    require('./data/courses');
//const peopleData =    require('./data/people');
//const venueData =     require('./data/venues');
//const schCourseData = require('./data/scheduledCourses');

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
  CourseModel
    .find()
    .then(courses => {
      res.json(courses);
    });
});

app.get('/api/people', (req, res) => { 
  PersonModel
    .find()
    .then(people => {
      res.json(people);
    });  
});

app.get('/api/venues', (req, res) => {
  VenueModel
    .find()
    .then(venues => {
      res.json(venues);
    });
});

app.get('/api/scheduledCourses', (req, res) => {
  ScheduledCourseModel
    .find()
    .populate('course')
    .populate('coordinator')
    .populate('instructor')
    .populate('tas')
    .populate('venue')
    .exec(function(err, allCourses){
      if(err) return console.log(err);
      res.json(allCourses);
    });
});

app.get('/api/scheduledCourses/:id', (req, res) => {
  ScheduledCourseModel
    .findById(req.params.id)
    .populate('course')
    .populate('coordinator')
    .populate('instructor')
    .populate('tas')
    .populate('venue')
    .exec(function(err, schCourse){
      if(err) return console.log(err);
      res.json(schCourse);
    });
});

app.post('/api/scheduledCourses', JSONParser, (req, res) => {
  ScheduledCourseModel
    .create({
      course: req.body.course
    })
    .then(newCourse => {
      console.log(newCourse);
    })
    .catch(err => {
      console.log(err);
    });
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
