const { v4: uuid } = require('uuid');
const jimp = require('jimp');

const Category = require('../models/Category');
const User = require('../models/User');
const Ad = require('../models/Ad');
const State = require('../models/State');

const addImage = async (buffer) => {
    const newName = `${uuid()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
    return newName;
}

module.exports = {
    getCategories: async (req, res) => {
        const cats = await Category.find();

        let categories = [];

        for (const cat of cats) {
            categories.push({
                ...cat._doc,
                img: `${process.env.NODE_BASE}/assets/images/${cat.slug}.png`
            });
        }
        res.json({ categories });
    },
    addAction: async (req, res) => {
        let { title, price, priceneg, desc, cat, token } = req.body;
        const user = await User.findOne({ token }).exec();
        if (!title && !cat) {
            res.json({ error: 'Título e/ou categoria não foram preenchidos' });
            return;
        }

        if (cat.length < 12) {
            res.json({ error: 'Categoria inexistente' });
            return;
        }

        const category = await Category.findById(cat).catch(() => null);
        if (!category) {
            res.json({ error: 'Categoria inexistente' });
            return;
        }

        if (price) {
            price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
            price = parseFloat(price);
        } else {
            price = 0;
        }

        const newAd = new Ad();
        newAd.status =  true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreated = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;

        if (req.files && req.files.img) {
            if (req.files.img.length == undefined) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    const url = await addImage(req.files.img.data);
                    newAd.images.push({ url, default: false });   
                }
            } else {
                for (let i = 0; i < req.files.img.length; i++) {
                    if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        const url = await addImage(req.files.img[i].data);
                        newAd.images.push({ url, default: false });   
                    }
                }
            }
        }

        if (newAd.images.length > 0) {
            newAd.images[0].default = true;
        }

        const info = await newAd.save();
        res.json({ id: info._id });
    },
    getList: async (req, res) => {
        const { sort = 'asc', offset = 0, limit = 8, q, cat, state } = req.query;
        let filters = { status: true };
        let total = 0;

        if (q) {
            filters.title = { '$regex': q, '$options': 'i'};
        }

        if (cat) {
            const c = await Category.findOne({ slug: cat }).exec();
            if (c) {
                filters.category = c._id.toString();
            }
        }

        if (state) {
            const s = await State.findOne({ name: state.toUpperCase() }).exec();
            if (s) {
                filters.state = s._id.toString();
            }
        }

        const adsTotal = await Ad.find(filters).exec();
        total = adsTotal.length;

        const adsData = await Ad.find(filters, null, { skip: offset })
            .sort({ dateCreated: (sort == 'desc' ? -1 : 1)})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec();

        let ads = [];
        for (let i in adsData) {

            let image = '';

            let defaultImg = adsData[i].images.find(e => e.default);
            if (defaultImg) {
                image = `${process.env.NODE_BASE}/media/${defaultImg.url}`;
            } else {
                image = `${process.env.NODE_BASE}/media/default.png`;
            }

            ads.push({
                id: adsData[i]._id,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceNegotiable,
                image
            })
        }
        res.json({ ads, total });
    },
    getItem: async (req, res) => {
        const { id, other = null } = req.query;

        if (!id) {
            res.json({ error: 'Sem produto.' });
            return;
        }

        if (id.length < 12) {
            res.json({ error: 'ID inválido.' });
            return;
        }

        const ad = await Ad.findById(id).catch((err) => null);
        if (!ad) {
            res.json({ error: 'Produto inexistente.' });
            return;
        }

        ad.views++;
        await ad.save();

        let images = [];
        for (let i in ad.images) {
            images.push(`${process.env.NODE_BASE}/media/${ad.images[i].url}`)
        }

        const category = await Category.findById(ad.category).exec();
        const userInfo = await User.findById(ad.idUser).exec();
        const stateInfo = await State.findById(ad.state).exec();

        let others = [];
        if (other) {
            const otherData = await Ad.find({ status: true, idUser: ad.idUser }).exec();

            for (let i in otherData) {
                if (otherData[i]._id.toString() != ad._id.toString()) {
                    let image = `${process.env.NODE_BASE}/media/default.jpg`;

                    const defaultImg = otherData[i].images.find(e => e.default);
                    if (defaultImg) {
                        image = `${process.env.NODE_BASE}/media/${defaultImg.url}.jpg`;
                    }
                    others.push({
                        id: otherData[i]._id.toString(),
                        title: otherData[i].title,
                        price: otherData[i].price,
                        priceNegotiable: otherData[i].priceNegotiable,
                        image
                    });
                }
            }
        }

        res.json({
            id: ad._id,
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            description: ad.description,
            dateCreated: ad.dateCreated,
            views: ad.views,
            images,
            category,
            userInfo: {
                name: userInfo.name,
                email: userInfo.email
            },
            stateName: stateInfo.name,
            others
        })
    },
    editAction: async (req, res) => {
        const { id } = req.params;
        const { title, status, price, priceneg, desc, cat, token } = req.body;

        if (id.length < 12) {
            res.json({ error: 'ID inválido' });
            return;
        }

        const ad = await Ad.findById(id).catch(() => null);

        if (!ad) {
            res.json({ error: 'Anúncio inexistente.' });
            return;
        }

        const user = await User.findOne({ token }).exec();

        if (user._id.toString() !== ad.idUser) {
            res.json({ error: 'Este anúncio não é seu.' });
            return;
        }

        let updates = {};

        if (title) {
            updates.title = title;
        }

        if (price) {
            let newPrice = price.replace('.', '').replace(',', '.').replace('R$ ', '');
            newPrice = parseFloat(newPrice);
            updates.price = newPrice;
        }

        if (priceneg) {
            updates.priceNegotiable = priceneg;
        }

        if (status) {
            updates.status = status;
        }

        if (desc) {
            updates.description = desc;
        }

        if (cat) {
            const category = Category.findOne({ slug: cat }).exec();
            if (!category) {
                res.json({ error: 'Categoria inexistente.' });
                return;
            }
            updates.category = category._id.toString();
        }

        await Ad.findByIdAndUpdate(id, { $set: updates });

        if (req.files && req.files.img) {
            const adI = await Ad.findById(id);

            if (req.files.img.length === undefined) {
                if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    const url = await addImage(req.files.img.data)
                    adI.images.push({
                        name: url,
                        default: false
                    }); 
                }         
            } else {
                for (let i in req.files.img) {
                    if (['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        const url = await addImage(req.files.img[i].data);
                        adI.images.push({
                            name: url,
                            default: false
                        });
                    }
                }
            }
            adI.images = [...adI.images];
            adI.save();
        }


        res.json({ error: '' });
    },
}