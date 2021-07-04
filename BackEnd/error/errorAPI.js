class ErrorApi extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static notFound(message) {
        return new ErrorApi(404, message);
    }

    static serverError(message) {
        return new ErrorApi(500, message);
    }

    static forbidden(message) {
        return new ErrorApi(403, message);
    }

}

module.exports = ErrorApi;