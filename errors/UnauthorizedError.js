const { StatusCodes } = require("http-status-codes");
const ContactAppError = require("./ContactAppError");

class UnauthorizedError extends ContactAppError{
    constructor(SpecificMessage){
        super("Unauthorized access","unauthorized Error",StatusCodes.UNAUTHORIZED,SpecificMessage)
    }
}
module.exports = UnauthorizedError