const User = require('../models/User');

module.exports = {
    private: async (req, res, next) => {
        if (!req.query.token && !req.body.token) {
            res.json({ notAllowed: true });
            return;
        }

        const token = req.query.token ? req.query.token : req.body.token;

        if (token == '') {
            res.json({ notAllowed: true });
            return;
        }

        const user = await User.findOne({ token });

        if (!user) {
            res.json({ notAllowed: true });
            return;
        }
        
        next();
    }
}