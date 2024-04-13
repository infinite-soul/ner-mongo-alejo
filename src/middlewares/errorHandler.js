export function errorHandler(err, req, res, next) {
    if (err instanceof SyntaxError) {
        const error = new Error('Invalid syntax');
        console.error('Syntax Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    if (err instanceof TypeError) {
        const error = new Error('Invalid type');
        console.error('Type Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    if (err instanceof RangeError) {
        const error = new Error('Value out of range');
        console.error('Range Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    if (err instanceof ReferenceError) {
        const error = new Error('Invalid reference');
        console.error('Reference Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    if (err.name === 'ValidationError') {
        const error = new Error(err.message);
        console.error('Validation Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    if (err.name === 'CastError') {
        const error = new Error('Invalid cast');
        console.error('Cast Error:', error.message);
        return res.status(400).json({ message: error.message });
    }

    const error = new Error('Internal server error');
    console.error('Internal Server Error:', error.stack);
    return res.status(500).json({ message: error.message });
}