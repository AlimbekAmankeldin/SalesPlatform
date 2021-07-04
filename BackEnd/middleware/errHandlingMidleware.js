const ApiErr = require('../error/errorAPI');


module.exports = function (err, req, res, next){
    if(err instanceof ApiErr){
        return res.status(err.status).json({message:err.message})
    }
    return res.status(500).json({message: "Что-то пошло не так"});
}