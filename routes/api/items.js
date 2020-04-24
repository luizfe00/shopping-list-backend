const express = require('express')
const router = express.Router()
const auth = require('../../middleware/authMiddleware')

// Item Model
const Item = require('../../models/Item')

// @route GET api/items
// @desc  GET All Items
// @acess Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// @route POST api/items
// @desc  Create A Item
// @acess Private
router.post('/', auth, (req, res) => {
    const newItem = new Item ({
            name: req.body.name
    })

    newItem.save().then(item => res.json(item))
})

// @route DELETE api/items
// @desc  Delete A Item
// @acess Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(400).json({ success: false }))
})




module.exports = router