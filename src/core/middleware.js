const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')

    res.status(err.status).send({
        message: err.message,
        status: err.status,
        name: err.name,
    })
}
const invalidPathHandler = (req, res, next) => {
    res.redirect('/error')
}

module.exports = {errorLogger, errorResponder, invalidPathHandler}
