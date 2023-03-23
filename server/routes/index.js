const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/note', require('./note.routes'))
router.use('/favorite', require('./favorite.routes'))
router.use('/trash', require('./trash.routes'))

module.exports = router