const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    
    const { name, email, picture } = req.decodedToken;

    const user = await User.findOneAndUpdate({ email }, { name: email.split('@')[0], picture }, { new: true});

    if (user) {
        res.status(200).json(user);
    } else {
        const newUser = await User({ 
            name: email.split('@')[0], 
            email, 
            picture
        }).save();
        res.status(200).json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    const { email } = req.decodedToken;
    User.findOne({ email}).exec((err, user) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(user);
        }
    });

    
};