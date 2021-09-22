// Route for getting all of a journal entries
//      GET to /journal/:journalId/entries
// entry Show Route
    //  GET to /journal/:journalId/entries/:entryId

    const router = require('express').Router();
    const db = require('../models')
    
    
    // index entries route
    
    // do we need this to render as a page? probably not, the entries should be indexed on the Journal show page anyway
    // either way, would need to know how to return the JSON object with only the entries per Journal
    
    router.get('/:journalId/entries', (req,res)=>{
        db.Journal.findById(req.params.journalId, (err, foundJournal)=>{
            console.log('hello from index entries route the found entry render')
             if (err) return console.log(err)
            // let foundentries = 
            console.log(foundJournal.entries)
            res.json(foundJournal)
            
        })
       
    })
    
    // router.get('/:id', (req, res) => {
    //     db.Journal.findById(req.params.id, (err, foundJournal) => {
    //         console.log('hello from one Journal')
    //       if (err) return console.log(err);
          
    //       res.json(foundJournal);
          
    //     });
    //   });
    
    
    
    // show entry route
    
    router.get('/:journalId/:entryId', (req,res) =>{
        console.log('route hit')
        console.log(req.params.journalId)
        //look thought Journal object to get the id, then find entries in that
        db.Journal.findById(req.params.journalId, (err, foundJournal) => {
            if (err) return console.log(err)
            console.log('found' + foundJournal.entries)
            //return those found entries ina  new array, this is not essential but cleans up the code a little
            const entriesArray = [...foundJournal.entries]
            console.log('Journal array log' , entriesArray)
            console.log(req.params.entryId)
            //this searches the entries array for the entry with the same id as in the url and stores it as a variable
            
            const foundEntry = entriesArray.find((entry)=>{
            // note the == here, the entry._id is a string but req.params.entryId is acutally a differnt datatype called an object ID, strict equality will match datatypes and fail, so use the double equals
            return entry._id == req.params.entryId
             
            })
            console.log(foundEntry)
            //now we render out that found entry on the page, 
            res.json(foundEntry)
            
        })
    
    })
    
    router.post('/:journalId', (req,res)=>{
        db.Entry.create(req.body,(err, newEntry)=>{
            console.log('created entry')
            if (err) return console.log(err)
            db.Journal.findByIdAndUpdate(
                req.params.journalId, { $push: {entries: newEntry}}, (err, updatedJournal) =>{
                    if (err) return console.log(err)
                    res.json(updatedJournal)
                }
            )
        })
    })
    
    // update entries route GOOD GOD WHAT
    
    // router.put('/:journalId/:entryId', (req,res)=>{
    //     db.entry.findByIdAndUpdate(
    //         req.params.id, // finds the entry with id passed in from URL
    //         req.body, // passes in data to update a entry from the req.body
    //         {new: true}, // We want to updated entry returned in the callback
    //         (err, updatedentry) => { // function called after update completes
    //           if (err) return console.log(err);
              
    //           res.json(updatedentry);
    //         });
    // })
    
    // router.put('/:id', (req, res) => {
        
    //   });
    
    
    
    
    // destroy entries route
    router.delete('/:journalId/:entryId',(req,res)=>{
        //go low to high, delete from the entries db first, then pass the entry that was deleted to the Journal db. 
        db.Entry.findByIdAndDelete(req.params.entryId, (err, deletedEntry) => {
            if (err) return console.log(err);
            db.Journal.findByIdAndUpdate(
                req.params.journalId,
                { $pull: {entries:deletedEntry}},
                {new: true}, // do you want the version with or without changes?, you want the Journal with the entry deleted, therefore new:true. 
                (err, updatedJournal) => {
                    if (err) return console.log(err)
                    res.json(updatedJournal)
                }
            )
          });
    })
    
    module.exports = router