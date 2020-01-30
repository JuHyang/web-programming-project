const router = require('express').Router()
const auth = require('./auth')
const career = require('./career')
const briefCareer = require('./briefcareer')
const portfolio = require('./portfolio')

router.use('/auth', auth)
router.use('/career', career)
router.use('/briefcareer', briefCareer)
router.use('/portfolio', portfolio)

module.exports = router