const globalErrorHandler = (error, req, res, next) => {
        const statusCode = error.statusCode || 500;
    
        return res.status(statusCode).json({
            message: error.message,
    
            errorStack: process.env.NODE_ENV === "development" ? error.stack : "🥞",
        })
    }

export default globalErrorHandler;