const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');

// checks if a user has a valid token
const handleUserAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect("/login");
    }
};


// checks the current user status and information 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}



module.exports = { handleUserAuth, checkUser };
