const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');


router.post('/register', async (req, res) => {
    // Register Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if User Already Exisit or not
    const emailExist = await User.findOne({ email: req.body.email })
    if ((emailExist)) return res.status(400).send("Email Already Exist");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post('/login', (req, res) => {
    res.send('Loged in')
})

module.exports = router;