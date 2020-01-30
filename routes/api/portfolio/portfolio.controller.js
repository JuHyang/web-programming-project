const User = require('../../../models/user')
const Portfolio = require('../../../models/portfolio')

/*
    GET /api/portfolio/
    @header Authorization (String)
    res
        result : 200 -> {portfolios : arrayOf(portfolio)} 
        ** portfolio -> { title: String, description: String, _id: String, photo: String(Path of Img) }
        result : 403 -> login Failed
*/
exports.get = (req, res) => {
    // find user's portfolios
    const get = (user) => {
        return Portfolio.getPortfoliosByUserID(user._id)
    }

    // respond to the client
    const respond = (portfolios) => {
        res.json({ "portfolios": portfolios })
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
    GET /api/portfolio/:studnetNum
    studentNum : String
    res
        result : 200 -> {portfolios : arrayOf(portfolio)} 
        ** portfolio -> { title: String, description: String, _id: String, photo: String(Path of Img) }
        result : 403 -> login Failed
*/
exports.getByStudentNum = (req, res) => {
    // find user's portfolios
    const get = (user) => {
        return Portfolio.getPortfoliosByUserID(user._id)
    }

    // respond to the client
    const respond = (portfolios) => {
        res.json({ "portfolios": portfolios })
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
    POST /api/portfolio/push
    @header Authorization (String)
    @Body
    {
        title : String,
        description : String,
        photo : file
    }
    res
        result : 200 -> push Success
        result : 403 -> push Fail
*/
exports.push = (req, res) => {
    const { title, description } = req.body
    const photo = req.file
    const orgPhotoName = photo.originalname
    const savePhotoName = photo.filename

    // create a new portfolio
    const create = (user) => {
        return Portfolio.create(title, description, orgPhotoName, savePhotoName, user._id)
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'push portfolio successfully',
        })
    }

    // error occurred
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByStudentNum(req.decoded.studentNum)
        .then(create)
        .then(respond)
        .catch(onError)
}

/*
    GET /images/{photo}
    photo : String in portfolio (Path of img)
    ex) <img src="IP:PORT/images/{photo}"/>
*/

/*
    PUT /api/portfolio/edit
    @header Authorization (String)
    @Body
    {
        portfolioID : String,
        title : String,
        description : String,
    }
    res
        result : 200 -> edit Success
        result : 403 -> edit Fail
*/
exports.edit = (req, res) => {
    const { portfolioID, title, description } = req.body

    // find a portfolio by protfolioID
    const find = (user) => {
        return Portfolio.getPortfolioByID(user._id, portfolioID)
    }

    // edit portfolio's title and description
    const edit = (portfolio) => {
        return portfolio.edit(title, description)
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'edit portfolio successfully',
        })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByStudentNum(req.decoded.studentNum)
        .then(find)
        .then(edit)
        .then(respond)
        .catch(onError)

}

/*
    DELETE /api/portfolio/delete
    @header Authorization (String)
    @Body
    {
        portfolioID : String,
    }
    res
        result : 200 -> delete Success
        result : 403 -> delete Fail
*/
exports.delete = (req, res) => {
    const { portfolioID } = req.body

    // delete portfolio by portfolioID
    const deleteByID = (user) => {
        return Portfolio.deleteByID(user._id, portfolioID)
    }

    // respond to the client
    const respond = () => {
        res.json({
            message: 'delete portfolio successfully',
        })
    }

    // error occured
    const onError = (error) => {
        console.error(error)
        res.status(403).json({
            message: error.message
        })
    }

    User.findOneByStudentNum(req.decoded.studentNum)
        .then(deleteByID)
        .then(respond)
        .catch(onError)
}