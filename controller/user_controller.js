// require user model
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const secrateKey = "sdadhhsahd";


// for adding/register user
module.exports.addUser = async function (req, res) {

    try {
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
            await newUser.save();
            // console.log(user);
            res.status(200).json({
                message: 'User created',
            })
        }
    } catch (err) {
        res.status(500).json(err);
    }


}

// for loginUser
module.exports.loginUser = async function (req, res) {
    try {

        if (req.headers.key !== secrateKey) {
            return res.status(404).json({
                message: "User unauthorized",
            })
        }
        const user = await User.findOne({ number: req.body.number });

        if (!user) {
            res.status(400).json({
                message: 'User does not exist'
            });
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json({
                message: "Wrong credentials"
            })
        }

        // create jwt token 
        const token = jwt.sign({
            name: user.name,
            number: user.number,
        }, "SECRET", { expiresIn: "24h" });



        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        res.status(500).json(err);
    }

}

// for addOrder
module.exports.addOrder = async function (req, res) {

    try {
        let token = req.headers.authorization;
        token = jwt.verify(token, "SECRET");
        if (token) {
            let user = await User.findOne({ token });
            if (!user) {
                return res.status(404).json({
                    message: "User unauthorized",
                })
            }
            let order = {
                id: crypto.randomUUID(),
                item_name: req.body.item_name,
                sub_total: req.body.sub_total,
                number: req.body.number
            }
            user.order.push(order);
            await user.save();

            return res.status(200).json({
                message: 'Order added',
            })

        }

    } catch (err) {
        res.status(500).json(err);
    }

}

// for getOrder
module.exports.getOrder = async function (req, res) {
    try {

        let token = req.headers.authorization;
        token = jwt.verify(token, "SECRET");
        if (token) {
            let user = await User.findOne({ token });
            if (!user) {
                return res.status(404).json({
                    message: "User unauthorized",
                })
            }
            return res.status(200).json({
                message: 'Order fetched Successfully',
                orders: user.order
            })
        }

    } catch (err) {
        return res.status(500).json(err);
    }

}
