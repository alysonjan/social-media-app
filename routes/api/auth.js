const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');


// @route GET api/auth
// @desc Test Route
// @access Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc Authenticate User And Get Token (Login)
// @access Public
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        

        const token = jwt.sign(payload, config.get('jwtSecret'), {expiresIn: '8h'} )
        const encryptedToken = CryptoJS.AES.encrypt(token, config.get('hashKey')).toString();
        res.json({encryptedToken})

        // jwt.sign(
        //     payload,
        //     config.get('jwtSecret'),
        //     { expiresIn: 360000 }, //need to change when in deployment to 1hour (3600)
        //     (err, token) => {
        //         if (err) throw err;
        //         res.json({ token });
        //     }
        // );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;