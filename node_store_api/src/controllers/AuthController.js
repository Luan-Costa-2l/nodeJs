const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const User = require('../models/User');
const State = require('../models/State');

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);

        const user = await User.findOne({ email: data.email });

        if (!user) {
            res.json({ error: 'E-mail e/ou senha errados.'});
            return;
        }

        const match = bcrypt.compareSync(data.password, user.passwordHash);

        if (!match) {
            res.json({ error: 'E-mail e/ou senha errados.'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = bcrypt.hashSync(payload, 10);

        user.token = token;
        await user.save();

        res.json({ token, email: data.email });
    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);

        const hasUser = await User.findOne({ email: data.email });
        if (hasUser) {
            res.json({ 
                error: { email: { msg: 'Este E-mail já existe.' } } 
            });
            return;
        }

        if(!mongoose.Types.ObjectId.isValid(data.state)) {
            res.json({
                error: { state: { msg: 'Código de estado inválido.' } }
            });
            return;
        }

        const hasState = await State.findById(data.state);
        if (!hasState) {
            res.json({ 
                error: { state: { msg: 'Estado não existe.' } } 
            });
            return;
        }
       
        const passwordHash = bcrypt.hashSync(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = bcrypt.hashSync(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });
        await newUser.save();

        res.json({ token });
    },
}