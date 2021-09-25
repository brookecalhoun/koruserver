const router = require('express').Router()

router.post('/', (req,res) =>{
    res.json({ msg: 'o hi thanks for visiting the auth route'})
})

module.exports = router