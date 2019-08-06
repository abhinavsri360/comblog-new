const User = require('../database/models/User')

module.exports = (req, res, next) =>{
    //fetch user request, verify user, if user is valid, permit request, else redirect
    if(req.session.userId)
    {
        return res.redirect('/')
    }
    next()
}