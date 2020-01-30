const router = require('express').Router()
const controller = require('./portfolio.controller')
const authMiddleware = require('../../../middlewares/auth')
const multer = require('multer')

const path = require('path')
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
})


router.get('/:studentNum', controller.getByStudentNum)

router.use('/', authMiddleware)
router.get('/', controller.get)



router.use('/push', authMiddleware)
router.post('/push', upload.single('photo'), controller.push)

router.use('edit', authMiddleware)
router.put('/edit', controller.edit)

router.use('edit', authMiddleware)
router.delete('/delete', controller.delete)

module.exports = router;
