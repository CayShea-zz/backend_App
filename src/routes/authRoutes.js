//********************************** */
//    EXPRESS setup for Router
//      set up JWT
//********************************** */

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const router = express.Router();



//POST route for sign up
router.post('/signup', async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY' );
        res.send({ token });

    } catch (err){
        return res.status(422).send(err.message);
    }    
});


//POST route to sign in
router.post('/signin', async (req,res) => {
    const { email, password } = req.body;

    const errMsg = () => res.status(404).send({ error: "Invalid email or password"});

    if(!email || !password){
        return res.status(422).send({ error: "Must provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user){
        return errMsg();
    }

    try {
        
        await user.checkPassword(password);
        
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY' );
        res.send({ token });

    } catch (err) {
        return errMsg();
    }
});

module.exports = router;