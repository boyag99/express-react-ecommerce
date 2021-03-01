const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    
    const { name, email, picture } = req.decodedToken;

    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true});

    if (user) {
        res.status(200).json(user);
    } else {
        const newUser = await User({ 
            name, 
            email, 
            picture
        }).save();
        res.status(200).json(newUser);
    }
};
