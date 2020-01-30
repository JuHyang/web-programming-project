const router = require('express').Router()
const controller = require('./briefcareer.controller')
const authMiddleware = require('../../../middlewares/auth')

router.get('/:studentNum', controller.getByStudentNum)

router.use('/', authMiddleware)
router.get('/', controller.get)


router.use('/push', authMiddleware)
router.post('/push', controller.push)


module.exports = router;
