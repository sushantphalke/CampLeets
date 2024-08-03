// routes/cohorts.js

const express = require('express');
const router = express.Router();
const {Cohort,User} = require('../db');

router.get('/', async (req, res) => {
    try {
        const cohorts = await Cohort.find({});
        res.json(cohorts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cohorts' });
    }
});

// GET /cohort/:cohortName
router.get('/:cohortName', async (req, res) => {
    const { cohortName } = req.params;
  
    try {
      // Find the cohort by name
      const cohort = await Cohort.findOne({ name: cohortName });
  
      if (!cohort) {
        return res.status(404).json({ message: 'Cohort not found' });
      }
  
      // Optionally, get detailed user data if needed (depending on your schema and needs)
      const users = await User.find({ username: { $in: cohort.usernames } }).select('-password -__v');
  
      res.json({ users });
    } catch (error) {
      console.error('Error fetching cohort data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Create a new cohort
router.post('/', async (req, res) => {
  try {
    const { name, description, usernames } = req.body;

    // Check if the cohort name is provided
    if (!name) {
      return res.status(400).json({ error: 'Cohort name is required' });
    }

    // Check if at least one username is provided
    if (!usernames || usernames.length === 0) {
      return res.status(400).json({ error: 'At least one username must be provided' });
    }
    const checkAv = await Cohort.findOne({name : req.body.name});
    if(checkAv)
    {
        return res.status(400).json({ error: 'Cohort name already taken' });
    }
    // Create a new cohort
    const cohort = await Cohort.create(req.body);

    // Respond with the created cohort
    res.status(201).json(cohort);
  } catch (error) {
    console.error('Error creating cohort:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/join', async (req, res) => {
    try {
      const { cohortName, username } = req.body;
  
      // Find the cohort by name and add the username if it's not already there
      const updatedCohort = await Cohort.findOneAndUpdate(
        { name: cohortName },
        { $addToSet: { usernames: username } }, // Add username to the array if not present
        { new: true } // Return the updated document
      );
  
      if (!updatedCohort) {
        return res.status(404).json({ error: 'Cohort not found' });
      }
  
      res.status(200).json(updatedCohort);
    } catch (error) {
      console.error('Error joining cohort:', error);
      res.status(500).json({ error: error.message });
    }
  });
// POST /cohort/leave
router.post('/leave', async (req, res) => {
    const { cohortName, username } = req.body;
  
    if (!cohortName || !username) {
      return res.status(400).json({ message: 'Cohort name and username are required' });
    }
  
    try {
      // Find the cohort by name
      const cohort = await Cohort.findOne({ name: cohortName });
  
      if (!cohort) {
        return res.status(404).json({ message: 'Cohort not found' });
      }
  
      // Check if the user is part of the cohort
      const userIndex = cohort.usernames.indexOf(username);
      if (userIndex === -1) {
        return res.status(400).json({ message: 'User is not part of the cohort' });
      }
  
      // Remove the user from the cohort's users array
      cohort.usernames.splice(userIndex, 1);
      await cohort.save();
  
      res.json({ message: 'User removed from cohort successfully' });
    } catch (error) {
      console.error('Error leaving cohort:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
