const db = require('./models')
const data = require('./journalData.json')

// Delete

db.Journal.deleteMany({}, (err, result) => {
    // establishing mongo for entries that are part of each Journal
    db.Entry.deleteMany({},(err,result)=>{
        if (err){
            console.log(err)
            process.exit()
        }
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log(result.deletedCount, 'Journal deleted')
        let entries = []
        for (let i=0;i<data.journals.length;i++){
            console.log(data.journals[i])
            entries.push(data.journals[i].entries || [])
            delete data.journals[i].entries
        }
        console.log('data. journals console log' , data.journals)
        console.log('entries console log' , entries)
        // establishing mongo for entries that are part of each Journal
        db.Journal.create(data.journals,(err,seededjournals) =>{
            if (err) {
                console.log(err)
                process.exit()
            }
            db.Entry.create(entries[0], (err,result)=>{
                if(err){
                    console.log(err)
                    process.exit()
                }
                console.log("RESULLLT" , result)
                seededjournals[0].entries.push(result)
                db.Journal.findByIdAndUpdate(seededjournals[0]._id,{ $push: {entries:result} },(err)=>{
                    if (err) return console.log(err)
                    process.exit()
                })
            })
        
        })

    })
})