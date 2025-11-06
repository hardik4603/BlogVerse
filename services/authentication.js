const jwt = require('jsonwebtoken');

function createTokenForUser(user){
    const payload = {
        fullName : user.fullName,
        _id : user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};