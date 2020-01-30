const User = require('../../../models/user')

/*
    GET /api/career/
    @header Authorization (String)
    res
        result : 200 -> {career : String}
        result : 403 -> login Failed
*/
exports.get = (req, res) => {
    // find user's career
    const get = (user) => {
        return user.getCareers()
    }

    // respond to the client
    const respond = (careers) => {
        res.json({ "careers": careers })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByStudentNum(req.decoded.studentNum)
        .then(get)
        .then(respond)
        .catch(onError)
}

/*
    GET /api/career/:studnetNum
    studentNum : String
    res
        result : 200 -> {career : String}
        result : 403 -> login Failed
*/
exports.getByStudentNum = (req, res) => {
    // find user's careers
    const get = (user) => {
        return user.getCareers()
    }

    // respond to the client
    const respond = (careers) => {
        res.json({ "careers": careers })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByStudentNum(req.params.studentNum)
        .then(get)
        .then(respond)
        .catch(onError)
}


/*
    POST /api/career/push
    @header Authorization (String)
    @Body
    {
        career : String
    }
    res
        result : 200 -> push Success
        result : 403 -> push Fail
*/
exports.push = (req, res) => {
    const { career } = req.body

    // change user's career
    const push = (user) => {
        user.pushCareer(career)
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'push career successfully',
        })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    // check studentNum duplication
    User.findOneByStudentNum(req.decoded.studentNum)
        .then(push)
        .then(respond)
        .catch(onError)
}

