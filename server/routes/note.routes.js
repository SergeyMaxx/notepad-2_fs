const express = require('express')
const auth = require('../middleware/auth.middleware')
const Note = require('../models/Note')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
  try {
    const {orderBy, equalTo} = req.query
    const list = await Note.find({[orderBy]: equalTo})
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
    const note = await Note.create({
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
    const note = await Note.findOne({id})

    if (!note) return

    if (req.body.favoritesStatus === undefined) {
      req.body.favoritesStatus = note.favoritesStatus
    }

    note.favoritesStatus = req.body.favoritesStatus
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
    const existingNote = await Note.findOne({id})

    if (!existingNote) return

    await Note.deleteOne({_id: existingNote._id})
    return res.json({message: 'Note deleted'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

module.exports = router