const jwt = require('jsonwebtoken');
const config = require('config');
const CryptoJS = require('crypto-js');

module.exports = function(req,res,next) {

    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, Authorization Denied' });
    }

    //Verify token
    try {
        const hashedToken = CryptoJS.AES.decrypt(token,config.get('hashKey'));
        const decryptedToken = hashedToken.toString(CryptoJS.enc.Utf8)
        const decoded = jwt.verify( decryptedToken,config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not Valid' })
        
    }
}