const User = require('../database/models/User')


module.exports = (req, res) =>{
    User.create(req.body,(error,user) =>{
        console.log(error)
        res.redirect('/')
    })
}