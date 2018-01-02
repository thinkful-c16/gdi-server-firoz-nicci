'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  descId: {
    type: String,
    required: true
  }
});

const PersonSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  slackHandle: {
    type: String,
    required: true
  }
});

const VenueSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  address2: String,
  company: {
    type: String,
    required: true
  },
  contactFirstName: String,
  contactLastName: String,
  contactPhone: String,
  notes: String,
  website: String
});

const ScheduledCourseSchema = new mongoose.Schema({
  courseId: {
    type: Schema.Types.ObjectId, ref: 'Course'
  },
  coordinatorId: {
    type: Schema.Types.ObjectId, ref: 'Person'
  },
  instructorId: {
    type: Schema.Types.ObjectId, ref: 'Person'
  },
  taId: [{ 
    type: Schema.Types.ObjectId, ref: 'Person' 
  }],
  venueId: {
    type: Schema.Types.ObjectId, ref: 'Venue'
  },
  dates: [ {
    date: Date,
    required: true
  }]

});

const CourseModel = mongoose.model('Course', CourseSchema);
const PersonModel = mongoose.model('Person', PersonSchema);
const VenueModel = mongoose.model('Venue', VenueSchema);
const ScheduledCourseModel = mongoose.model('ScheduledCourse', ScheduledCourseSchema);

module.exports = {CourseModel, PersonModel, VenueModel, ScheduledCourseModel};