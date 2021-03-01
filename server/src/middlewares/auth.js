const admin = require('../firebase');

exports.authCheck = async (req, res, next) => {
    
    const token = req.headers.token;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(error);
    }
}