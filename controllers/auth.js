const router = require('express').Router()
const db = require('../models')

router.post('/', async (req,res) => {
    const id = req.body.auth0Id
    console.log(id)    

    const user = await db.User.findOne({ auth0Id: id })
    if(!user) {
        const newlyCreatedUser = await db.User.create({ auth0Id: id })
        console.log(newlyCreatedUser)
    }


    res.json({ msg: 'thanks for visiting the /auth route'})
})

module.exports = router