const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('ERROR!xc')
        }
        const decodedToken = jwt.verify(token, 'dontshare');
        req.userData = {userId: decodedToken.userId}
        next();
    } catch (err) {
        const error = new HttpError('AUTH FAILED', 500)
        return next(error)
    }
    
}