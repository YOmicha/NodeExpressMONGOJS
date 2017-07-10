var jwt = require('jsonwebtoken')

module.exports.authenticate =  function(req, res){
    var user = {
        username : 'mijimenez',
        email:'mjimenez@gmail.com'
    }
    var token =  jwt.sign(user, process.env.SECRET_key,{
        expiresIn: 4000
    });
    res.json({
        success: true,
        token: token
    })
}