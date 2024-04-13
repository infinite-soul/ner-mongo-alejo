export function requestLogger(req, res, next) {
    try {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    } catch (error) {
        const err = new Error(`Error logging request: ${error.message}`);
        console.error(err);
        next(err);
    }
}