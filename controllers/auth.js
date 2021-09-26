const db = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
    const id = req.body.auth0Id
    console.log(id)
    const user = await db.User.findOne({ auth0Id: id })
    console.log('the user', user)

    if(!user) {
        const newUser = await db.User.create({ auth0Id: id })
        console.log('created', newUser)
    }
    
    res.send({ msg: `okay thanks for sending me ${req.body.auth0Id}`})
})


module.exports = router