module.exports = theFunc =>(req,res, next) =>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}


//used for due to infinite time loading in postman OR not getting any Response.