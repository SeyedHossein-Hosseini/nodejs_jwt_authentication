const jsonwebtoken = require('jsonwebtoken');

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

module.exports = { handleUserAuth };
