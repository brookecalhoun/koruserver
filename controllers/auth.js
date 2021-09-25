const { db } = require('../models/User')

const router = require('express').Router()

router.post('/', async (req,res) =>{
    const id = req.body.auth0Id
    console.log(id)
    const user = await db.user.findOne({auth0Id: id})
    if(!user){
        const newlyCreatedUser = await db.user.create({auth0Id: id})
        console.log(newlyCreatedUser)
    }
    res.json({ msg: 'o hi thanks for visiting the auth route'})
})







module.exports = router