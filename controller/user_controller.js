// require user model
const User = require('../model/User');
const bcrypt = require('bcrypt');



// for adding/register user
module.exports.addUser = async function (req, res) {

    try {
        console.log(req.body);
        const number = await User.findOne({ number: req.body.number });
        if (number) {
            res.status(200).json({
                message: 'User already exists'
            })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                number: req.body.number,
                password: hashedPass,
            })
            const user = await newUser.save();
            // console.log(user);
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json(err);
    }


}

// for loginUser
module.exports.loginUser = function (req, res) {


}

// for addOrder
module.exports.addOrder = function (req, res) {


}

// for getOrder
module.exports.getOrder = function (req, res) {


}
