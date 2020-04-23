class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode // Adds a "code" property
    }
}

module.exports = HttpError