const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY;

function signToken (payload) {
    // syn
    return jwt.sign(payload,secretKey)
}

function verifyToken (token) {
    try {
    return jwt.verify(token, secretKey)
} catch (err) {
    throw new Error('invalid token');
}
}

module.exports = {
    signToken,
    verifyToken
}