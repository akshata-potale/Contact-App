const Contact = require("./Contact")
const ValidationError = require("./errors/ValidationError")

class ContactDetails{
    static id =0
    constructor(typeOfContactDetails,number){
        this.id = ContactDetails.id++
        this.typeOfContactDetails = typeOfContactDetails
        this.number = number
    }

    static newContactDetails(typeOfContactDetails,number){
        try {
            if(typeof typeOfContactDetails!='string'){
                throw new ValidationError("Invalid data")
            }

            if(typeof number!='string'){
                throw new ValidationError("Invalid number")
            }

            if(number.length!=10){
                throw new ValidationError("Invalid number")
            } 
        return new ContactDetails(typeOfContactDetails,number);   
        } catch (error) {
            throw error
            
        }
    }

    updateType(newValue){
        if(typeof newValue !='string'){
            throw new ValidationError("Invalid new Value")
        }
        this.typeOfContactDetails = newValue
    }

    updateNumber(newValue){
        if (typeof newValue!='string'){
            throw new ValidationError("Invalid new value")    
        }
        if(newValue.length!=10){
            throw new ValidationError("invalid new value")
        }
        this.number = newValue
    }
    updateContactDetails(parameter,newValue){
        try {
            if(typeof parameter != 'string'){
                throw new ValidationError('Enter valid parameter')
            }
            if(typeof newValue!='string'){
                throw new ValidationError("invalid new value")
            }
            console.log("parameter:>>>>>>>>>>>>",parameter);
            switch (parameter) {
                
                case "typeOfContactDetails":this.updateType(newValue)
                    return this
                    
                case "number":  this.updateNumber(newValue)
                    return this
                    
                default:
                    throw new Error('Invalid details')
                    
            }
            
        } catch (error) {
            throw error 
        }

        
    }
   


}
module.exports = ContactDetails