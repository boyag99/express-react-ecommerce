const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
    const token = req.headers.token;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.decodedToken;
    const adminUser = await User.findOne({ email: email }).exec();

    if (adminUser.role !== 'admin') {
        res.send(403).json({
            message: 'You do not have permission to access this page',
        });
    }

    next();
};
