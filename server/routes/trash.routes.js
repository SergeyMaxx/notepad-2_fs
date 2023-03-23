const express = require('express')
const auth = require('../middleware/auth.middleware')
const Trash = require('../models/Trash')
const Note = require('../models/Note')
const Favorite = require('../models/Favorite')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
  try {
    const {orderBy, equalTo} = req.query
    const list = await Trash.find({[orderBy]: equalTo})
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
    const note = new Trash({
      ...req.body,
      userId: req.user._id
    })

    await note.save()
    res.status(201).send(note)

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
    const existingNote = await Trash.findOne({id})

    if (!existingNote) return

    await Trash.deleteOne({_id: existingNote._id})
    return res.json({message: 'Note restored'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    await Trash.deleteMany()
    return res.json({message: 'Notes deleted'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

module.exports = router