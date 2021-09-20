const router = require('express').Router();
const db = require('../models');

// BASE ROUTE - /api/cities

// actual route - GET /api/journal

router.get('/', (req, res) => {
  db.Journal.find({}, (err, foundJournal) => {
    console.log('hello from get')

    console.log(foundJournal)

    if (err) return console.log(err);

    
    res.json(foundJournal);
  });
});


// actual route - GET /api/cities/:id
router.get('/:id', (req, res) => {
  db.Journal.findById(req.params.id, (err, foundJournal) => {
      console.log('hello from one entry')
    if (err) return console.log(err);
    
    res.json(foundJournal);
    
  });
});


// actual route - POST /api/journal
router.post('/', (req, res) => {
  
  db.Journal.create(req.body, (err, savedJournal) => {
      console.log('hello from post')
    if (err) return console.log(err);
    
    res.json(savedJournal);
  });
});


// actual route - PUT /api/journal/:id
router.put('/:id', (req, res) => {
  db.Journal.findByIdAndUpdate(
    req.params.id, // finds the Journal with id passed in from URL
    req.body, // passes in data to update a Journal from the req.body
    {new: true}, // We want to updated Journal returned in the callback
    (err, updatedJournal) => { // function called after update completes
      if (err) return console.log(err);
      
      res.json(updatedJournal);
    });
});


// actual route - DELETE /api/journal/:id
router.delete('/:id', (req, res) => {
  console.log('delete route')
  db.Journal.findByIdAndDelete(req.params.id, (err, deletedJournal) => {
    if (err) return console.log(err);
    res.json({ messaage:'Successful deletion' });
  });
});


module.exports = router;