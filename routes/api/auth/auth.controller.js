const jwt = require('jsonwebtoken')
const User = require('../../../models/user')

/*
    POST /api/auth/register
    {
        username : String,
        password : String
    }
    res 
        result : 200 -> register complete
        result : 409 -> register fail
*/
exports.register = (req, res) => {
    const { studentNum, password } = req.body
    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('studentNum exists')
        } else {
            return User.create(studentNum, password)
        }
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'registered successfully'
        })
    }

    // run when there is an error (studentNum exists)
    const onError = (error) => {
        console.error(error)
        res.status(409).json({
            message: error.message
        })
    }

    // check studentNum duplication
    User.findOneByStudentNum(studentNum)
        .then(create)
        .then(respond)
        .catch(onError)
}


/*
    POST /api/auth/login
    {
        username : String,
        password : String
    }
    res
        result : 200 -> {token : String}
        result : 403 -> login Failed
*/

exports.login = (req, res) => {
    const { studentNum, password } = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
    const check = (user) => {
        if (!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if (user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            studentNum: user.studentNum
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'KAU',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByStudentNum(studentNum)
        .then(check)
        .then(respond)
        .catch(onError)
}


/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}