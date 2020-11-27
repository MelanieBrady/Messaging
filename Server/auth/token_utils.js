const jwt = require("jsonwebtoken")
const config = require('../config.json')

const secret = config.token.secret

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        // Verify token is from our server - handle if not correct token
        jwt.verify(token, secret, (error) => {
            if (error) {
                res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });

                // Didn't error when authenticating so now we can call the next function in the chain of middlewhere and process message request
            } else {
                next();
            }
        });

        // Bad token 
    } else {
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

};

const getTokenPayload = (token) => {
    return jwt.decode(token, { complete: true }).paylod;
};

const getUsernameFromToken = (token) => {
    const payload = getTokenPayload(token);
    return (payload) ? payload.username : null;
}

module.exports = { verifyToken, getUsernameFromToken }; 