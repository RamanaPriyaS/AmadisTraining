function errorHandler(err,request,reply){
    request.log.error(err);
    if (err.name === 'SequelizeValidationError') {
        return reply.status(400).send({ 
            message: 'Validation error',});
    }
    if 
    (err.name === 'SequelizeUniqueConstraintError') {
        return reply.status(400).send({ 
            message: 'Duplicate entry error',});
    }
    if (err.statusCode) {
        return reply.status(err.statusCode).send({ 
            message: err.message,});
    }
    return reply.status(500).send({
        message: 'Internal Server Error',
    });     
}
module.exports = errorHandler;