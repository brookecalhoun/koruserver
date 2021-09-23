const router = require('express').Router();
const db = require('../models');

//BASE ROUTE - /api/journal
router.get('/', (req, res) => {
  db.Journal.find({}, (err, foundJournal) => {
    console.log('hello from get')

    console.log(foundJournal)

    if (err) return console.log(err);

    
    res.json(foundJournal);
  });
});


// actual route - GET /api/journal/:id
router.get('/:id', (req, res) => {
  db.Journal.findById(req.params.id, (err, foundJournal) => {
      console.log('hello from one journal')
    if (err) return console.log(err);
    
    res.json(foundJournal);
    
  });
});


// actual route - POST /api/cities
router.post('/', (req, res) => {
  
  db.Journal.create(req.body, (err, savedJournal) => {
      console.log('hello from post')
    if (err) return console.log(err);
    
    res.json(savedJournal);
  });
});


// actual route - PUT /api/cities/:id
router.put('/:id', (req, res) => {
  db.Journal.findByIdAndUpdate(
    req.params.id, // finds the City with id passed in from URL
    req.body, // passes in data to update a City from the req.body
    {new: true}, // We want to updated City returned in the callback
    (err, updatedJournal) => { // function called after update completes
      if (err) return console.log(err);
      
      res.json(updatedJournal);
    });
});


// actual route - DELETE /api/cities/:id
router.delete('/:id', (req, res) => {
  console.log('delete route')
  db.Journal.findByIdAndDelete(req.params.id, (err, deletedJournal) => {
    if (err) return console.log(err);
    res.json({ messaage:'Successful deletion' });
  });
});


module.exports = router;
