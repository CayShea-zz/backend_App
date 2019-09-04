//**************************************************************************************** */
//    Check if User is logged in
//        MiddleWare
//**************************************************************************************** */

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');


//'Authenticate' User by checking if JWT matches (located in header)
module.exports = (req, res, next) => {
    // JWT is located in req.header
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    };

    const token = authorization.replace('Bearer ', '');

    jwt.verify( token, 'SECRET_KEY', async(err, payload) => {
        if (err) {
            return res.status(401).send({ error: "You must be logged in" });
            }
        const user = await User.findById(payload);
        req.user = user;
        next();
    });        
};
    
