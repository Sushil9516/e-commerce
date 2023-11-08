// -------> The "pseudocode" for the built-in Error class defined by JavaScript itself
// class Error {
//     constructor(message) {
//       this.message = message;
//       this.name = "Error"; // (different names for different built-in error classes)
//       this.stack = <call stack>; // non-standard, but most environments support it
//     }
//   }


class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode; 
            
        // We can comment this bottom line
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;