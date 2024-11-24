const errorHandler = (err, req, res, next) => {

    console.error(err.stack); // Log the error for debugging

    // Respond with a 500 status and error details
    res.status(err.status || 500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
}

export default errorHandler;