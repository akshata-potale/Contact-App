const ContactAppError = require("./ContactAppError");
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends ContactAppError{
    constructor(SpecificMessage){
        super("Record Not Found","Not Found Error",StatusCodes.NOT_FOUND,SpecificMessage)
    }

}
module.exports = NotFoundError