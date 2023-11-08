const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"; 
    
      //Wrong Mongodb Id error (i.e  "CastError: Cast to ObjectId failed for value \"650c\" (type string) at path \"_id\" for model \"Product\"\n    at ObjectId.)
     if(err.name == "CastError")
     {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400);
     }

      // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
        //This bottom line connected from captureStackTrace from stack trace
        // error: err.stack,
    })
}   


// 4:00:07 / 15:57:56