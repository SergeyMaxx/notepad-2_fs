const express = require('express')
const User = require('../models/User')
const Token = require('../models/Token')
const Note = require('../models/Note')
const Favorite = require('../models/Favorite')
const Trash = require('../models/Trash')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()
    res.status(200).send(list)

  } catch (error) {
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.patch('/', auth, async (req, res) => {
  try {
    const {userId} = req.body
    const updatedUser = await User.findByIdAndUpdate(userId)

    updatedUser.name = req.body.name || updatedUser.name
    updatedUser.image = req.body.image || updatedUser.image
    await updatedUser.save()
    return res.json({message: 'User name updated'})

  } catch (error) {
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    const {userId} = req.body
    const user = await User.findOne({userId})

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    await Note.deleteMany({userId})
    await Favorite.deleteMany({userId})
    await Trash.deleteMany({userId})
    await Token.deleteMany({user: userId})
    await User.findByIdAndDelete(userId)
    return res.json({message: 'User deleted'})

  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: 'An error has occurred on the server. Try later'
    })
  }
})

module.exports = router