export function errorHandler(err, req, res, next) {
    res.status(400).json({
        message: err.message,
    });
}
//# sourceMappingURL=errorHandler.js.map