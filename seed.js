const db = require('./models')
const data = require('./journalData.json')

// Delete

db.Journal.deleteMany({}, (err, result) => {
        if (err) {
          console.log(err);
          process.exit();
        }
        console.log(result.deletedCount, 'journal deleted')
        console.log('data. journal console log' , data.journal)
        // establishing mongo for articles that are part of each City
        db.Journal.create(data.cities,(err,seededJournal) =>{
            if (err) {
                console.log(err)
                process.exit()
            }
                console.log("RESULLLT" , result)
                db.Journal.findByIdAndUpdate(seededJournal._id,(err)=>{
                    if (err) return console.log(err)
                    process.exit()
                })
            })
        
        })


// db.Article.deleteMany({}, (err, result) => {
//     if (err) {
//       console.log(err);
//       process.exit();
//     }
//     console.log(result.deletedCount, 'article deleted')
//     db.Article.create(data.cities,(err,seededCities) =>{
//         if (err) {
//             console.log(err)
//             process.exit()
//         }
    
//         console.log(seededCities.length, 'article created')
//         console.log('done')
    
//         process.exit()
//     })
// })


// Create



