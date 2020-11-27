const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {

    // Register Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if User Already esists or not
    const emailExist = await User.findOne({ email: req.body.email })
    if ((emailExist)) return res.status(400).send("Email Already Exist");

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post('/login', async (req, res) => {
    // Login Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Email Already esists or not
    const user = await User.findOne({ email: req.body.email })
    if ((!user)) return res.status(400).send("Email not correct!");

    // check if password is correct 
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) return res.status(400).send("Password not correct!");

    // create and assign a token to user
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
})

module.exports = router;