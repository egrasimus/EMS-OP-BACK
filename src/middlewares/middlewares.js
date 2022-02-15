const ErrorResponse = require("../classes/error-response");
// const Token = require("../dataBase/models/todo/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

// const requireToken = async (req, res, next) => {
//     const tokenValue = req.cookies['x-access-token'];
//     console.log(tokenValue)
//     if(tokenValue){
//         req.token = await Token.findOne({where:{value: tokenValue}});
//         if ( !req.token) {
//             throw new Error("token ne pravilnya", 400);
//         }
//     }else{
//         throw new Error("token ne pravilnya", 400);
//     }
//     next();
// };


const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    // requireToken,
};