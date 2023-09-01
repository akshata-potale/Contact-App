const { StatusCodes } = require("http-status-codes");
const ContactAppError = require("./ContactAppError");

class ValidationError extends ContactAppError{
    constructor(SpecificMessage){
        super("Invalid Parameters","Validation Error",StatusCodes.BAD_REQUEST,SpecificMessage)
    }
}
module.exports = ValidationError
