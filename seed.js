const db = require('./models')
const data = require('./journalData.json')

// Delete

db.Journal.deleteMany({}, (err, result) => {
    // establishing mongo for articles that are part of each Journal
        if (err){
            console.log(err)
            process.exit()
        }
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log(result.deletedCount, 'Journal deleted')
        console.log('data. journalEntries console log' , data.journalEntries)
        // establishing mongo for articles that are part of each Journal
        db.Journal.create(data.journalEntries,(err,seededjournalEntries) =>{
            if (err) {
                console.log(err)
                process.exit()
            }
                if(err){
                    console.log(err)
                    process.exit()
                }
                console.log("RESULLLT" , result)
                seededjournalEntries[0].articles.push(result)
                db.Journal.findByIdAndUpdate(seededjournalEntries[0]._id,(err)=>{
                    if (err) return console.log(err)
                    process.exit()
                })
    })
})