
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors')



const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new UnauthenticatedError('You are Unauthorize')

    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, email: payload.email }
        // console.log(payload);
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication failed')
    }
}

module.exports = auth