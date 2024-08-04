// backend/db.js
require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL =  process.env.DB_URL;
mongoose.connect(DB_URL)

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username: String,
    problems : Number,
    easy : Number,
    medium : Number,
    hard : Number,
    password : String
});


// Create a model from the schema
const User = mongoose.model('User', userSchema);

const CohortSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    usernames: [{
      type: String,
      required: true,
    }]
  }, {
    timestamps: true,
  });
  
  const Cohort = mongoose.model('Cohort', CohortSchema);

module.exports = {
	User,
    Cohort
};