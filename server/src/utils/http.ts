class HttpError extends Error {
    statusCode: number;
    type: string;

    constructor(message: string, statusCode: number, type = 'invalid_request_error') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
    }
}

export { HttpError }