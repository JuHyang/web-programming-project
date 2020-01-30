const User = require('../../../models/user')

/*
    GET /api/briefcareer/
    @header Authorization (String)
    res
        result : 200 -> {briefcareers : String}
        result : 403 -> login Failed
*/
exports.get = (req, res) => {
    // find user's breifcareers
    const get = (user) => {
        return user.getBriefCareers()
    }

    // respond to the client
    const respond = (briefcareers) => {
        res.json({ "briefcareers": briefcareers })
    }

    //error onccured
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
    GET /api/briefcareer/:studnetNum
    studentNum : String
    res
        result : 200 -> {briefcareer : String}
        result : 403 -> login Failed
*/
exports.getByStudentNum = (req, res) => {
    // find user's breifcareers
    const get = (user) => {
        return user.getBriefCareers()
    }

    // respond to the client
    const respond = (briefcareers) => {
        res.json({ "briefcareers": briefcareers })
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
    POST /api/briefcareer/push
    @header Authorization (String)
    @Body
    {
        briefcareer : String
    }
    res
        result : 200 -> push Success
        result : 403 -> push Fail
*/
exports.push = (req, res) => {
    const { briefcareer } = req.body

    // change user's breiftcareer
    const push = (user) => {
        user.pushBriefCareer(briefcareer)
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'push briefcareer successfully',
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