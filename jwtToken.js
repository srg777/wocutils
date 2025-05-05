const jwt = require('jsonwebtoken');

function generateToken(payload, secret, expiresIn) {
    const token = jwt.sign(payload,  secret, {expiresIn});
    return token;
}

function validateToken(token, secret) {
    try {
        const userData = jwt.verify(token, secret);
        return userData;
    } catch(e) {
        return null;
    }
}


module.exports = {generateToken, validateToken};