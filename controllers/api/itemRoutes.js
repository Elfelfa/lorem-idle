const router = require('express').Router();
const { Item } = require('../../models');
const Auth = require('../../utils/auth');

router.get('/', Auth, async (req, res) => {
    try {
        const itemData = await Item.findAll();

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', Auth, async (req, res) => {
    try {
        const itemData = await Item.findByPk(req.params.id);

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/bySkill/:skill_id', Auth, async (req, res) => {
    try {
        const itemData = await Item.findAll({
            where: {
                skill_id: req.params.skill_id
            }
        });

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/value/:id', Auth, async (req, res) => {
    try {
        const itemData = await Item.findByPk(req.params.id, {
            attributes: ['value'],
        });

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;