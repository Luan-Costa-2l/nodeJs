const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

module.exports = {
    getStates: async (req, res) => {
        const states = await State.find();
        res.json({ states });
    },
    info: async (req, res) => {
        const token = req.query.token;

        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const Ads = await Ad.find({ idUser: user._id.toString() });

        let adList = [];

        for (const ad of Ads) {
            const cat = await Category.findById(ad.category);
            adList.push({ ...ad, category: cat.slug });
        }

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        });
    },
    editAction: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }

        const data = matchedData(req);

        const filter = { token: data.token };
        let update = {};

        if (data.name) {
            update.name = data.name;
        }
        if (data.email) {
            const emailCheck = await User.find({ email: data.email});
            if (emailCheck) {
                res.json({ error: 'E-mail já existe!' });
                return;
            }
            update.email = data.email;
        }
        if (data.password) {
            update.passwordHash = bcrypt.hashSync(data.password, 10);
        }
        if (data.state) {
            if (!mongoose.Types.ObjectId.isValid(data.state)) {
                res.json({ error: 'Código de estado inválido.' });
                return;
            }

            const stateCheck = await State.findById(data.state);

            if (!stateCheck) {
                res.json({ error: 'Estado não existe!' });
                return;
            }
            update.state = data.state;
        }

        await User.findOneAndUpdate(filter, update);

        res.json({ updated: true });
    },
}