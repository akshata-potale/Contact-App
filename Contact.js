const ContactDetails = require("./ContactDetails")
const User = require("./User")
const {NotFoundError,UnauthorizedError,ValidationError}= require("./errors")


class Contact{
    static id = 0
    constructor(firstname,lastname){
        this.id = Contact.id++
        this.firstname = firstname
        this.lastname = lastname
        this.isActive = true,
        this.contactDetails = []

    }

    static newContact(firstname,lastname){
        try {
            if(typeof firstname!= 'string'){
                throw new ValidationError("Invalid firstname")
            }
            if(typeof lastname != 'string'){
                throw new ValidationError("Invalid lastname")
            }

            return new Contact(firstname,lastname)
        } catch (error) {
            return error   
        }   
    }

    UpdateFirstName(newValue){
        try {
            if(typeof newValue!='string'){
                throw new ValidationError("First name is invalid")
            }
            this.firstname = newValue
        } catch (error) {
            return error
            
        } 
    }

    UpdateLastName(newValue){
        try {
            if(typeof newValue!='string'){
                throw new ValidationError("last name is invalid")
            }
            this.lastname = newValue
        } catch (error) {
            return error
            
        } 
    }


    updateContact(parameter, newValue) {
        try {
            if(typeof parameter!= 'string'){
                throw new ValidationError("enter valid parameter")
            }

            switch (parameter) {
                case "firstname": this.updateFirstname(newValue)
                    return this
                case "lastname" : this.UpdateLastName(newValue)
                    return this
                default:
                    throw new ValidationError("invalid parameter");
            }
        } catch (error) {
            return error
        }
    }
    
    createContactDetails(typeOfContactDetails,number){
        if(!this.isActive){
            throw new UnauthorizedError("user not active")
        }
        let newContactDetails = ContactDetails.newContactDetails(typeOfContactDetails,number)
        // console.log(newContactDetails);
        this.contactDetails.push(newContactDetails)
        return newContactDetails
    }

    getContactDetails(){
        return this.contactDetails
    }

    findContactDetails(detailsId){
        for (let index = 0; index < this.contactDetails.length; index++) {
            if(detailsId == this.contactDetails[index].id){
                return this.contactDetails[index]
            }
            return null
        }
    }
    updateContactDetails(detailsId,parameter,newValue){
        try {
            let tobeUpdatedDetails = this.findContactDetails(detailsId)
            if(tobeUpdatedDetails == null){
                    throw new NotFoundError('details not found')
            }
            return tobeUpdatedDetails.updateContactDetails(parameter,newValue)
        } catch (error) {
            throw error
        }
    }

    deleteContactDetails(detailsId){
        return this.contactDetails.splice(detailsId,1)
    }

    

    


}
module.exports = Contact