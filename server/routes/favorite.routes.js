const express = require('express')
const auth = require('../middleware/auth.middleware')
const Favorite = require('../models/Favorite')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
  try {
    const {orderBy, equalTo} = req.query
    const list = await Favorite.find({[orderBy]: equalTo})
    res.send(list)

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const note = await Favorite.create({
      ...req.body,
      userId: req.user._id
    })

    await note.save()
    res.status(201).json(note)

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const {id} = req.params
    const note = await Favorite.findOne({id})

    if (!note) return

    note.favoritesStatus = req.body.favoritesStatus || note.favoritesStatus
    note.header = req.body.header || note.header
    note.newNote = req.body.newNote || note.newNote

    await note.save()
    return res.json({message: 'Note updated'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const {id} = req.params
    const existingNote = await Favorite.findOne({id})

    if (!existingNote) return

    await Favorite.deleteOne({_id: existingNote._id})
    return res.json({message: 'Note deleted'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

module.exports = router