class BadRequestError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this,this.constructor);

        this.name = this.constructor.name;
        this.status = 400;

    }

    // statusCode() {
    //     return this.status;
    // }
}

module.exports = BadRequestError;
