const Contact = require("./Contact")
const ContactDetails = require("./ContactDetails")
const {NotFoundError,UnauthorizedError,ValidationError}= require("./errors")


class User{
    static id = 0
    static allUsers = []
    constructor(firstname,lastname,isAdmin){
        this.id = User.id++
        this.firstname = firstname
        this.lastname = lastname
        this.isAdmin  = isAdmin
        this.isActive = true
        this.contacts = []
    }

    static newAdmin(firstname,lastname){
        try {
            if(typeof firstname!= 'string'){
                throw new ValidationError("Invalid firstname")
            }
            if(typeof lastname!= 'string'){
                throw new ValidationError("Invalid lastname")
            }
            return new User(firstname,lastname,true)
            
        } catch (error) {
            return error
            
        }
    }
    newUser(firstname,lastname){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Not an admin")
            }

            if(typeof firstname!="string"){
                throw new ValidationError("Invalid first name")
            }
            if(typeof lastname!="string"){
                throw new ValidationError("Invalid last name")
            }

            let newUser = new User(firstname,lastname,false)
            User.allUsers.push(newUser)
            return newUser

        } catch (error) {
            console.log(error);            
        }
    }

    getAllUsers(){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Not an admin")
            }
            if(User.allUsers.length == 0){
                throw new NotFoundError("User not found")
            }

            return User.allUsers
            
        } catch (error) {
             return error 
            
        }
    }

    static findAllUsers(userId){
        for (let index = 0; index < User.allUsers.length; index++) {
            if(userId == User.allUsers[index].id){
                return User.allUsers[index]
            }   
        }
        return null
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
            
        }
        
    }

    updateUsers(id,parameter,newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Not an admin")
            }
            if(typeof parameter!= 'string'){
                throw new ValidationError("enter valid parameter")
            }
            let toUpdateUser = User.findAllUsers(id)
            if(toUpdateUser == null){
                throw new NotFoundError("User not found")
            }
            switch (parameter) {
                case "firstname":toUpdateUser.UpdateFirstName(newValue)
                    return toUpdateUser
                
                case "lastname": toUpdateUser.UpdateLastName(newValue)
                return toUpdateUser
                default:
                    throw new ValidationError("Invalid parameter");
            }   
        } catch (error) {
            return error    
        }
    }

    deleteUser(userId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Not an admin")
            }
            let usertobedelete = User.findAllUsers(userId)
            usertobedelete.isActive = false
            User.allUsers.splice(userId,1)
            return usertobedelete
        } catch (error) {
            return error
            
        }
    }

    createContact(firstname,lastname){
        if(!this.isActive){
            throw new UnauthorizedError("user not active")
        }
        if(this.isAdmin){
            throw new UnauthorizedError("Not an admin")
        }
        let newContact = Contact.newContact(firstname,lastname)
        this.contacts.push(newContact)
        return newContact
    }


    getContacts(){
        if(this.isAdmin){
            throw new UnauthorizedError("Admin cannot have access to contacts")
        }
        return this.contacts
    }

    findContact(contactId){
        for (let index = 0; index < this.contacts.length; index++) {
            if (contactId == this.contacts[index].id) {
                return this.contacts[index]
            }
            return null
        }
    }

    updateContact(contactId,parameter,newValue){
        if (this.isAdmin) {
            throw new UnauthorizedError("Admin Cannot update contact")
        }
        let ToBeUpdatedContact = this.findContact(contactId)
        if (ToBeUpdatedContact == null) {
            throw new NotFoundError("Contact Not Found")
        }
        return ToBeUpdatedContact.updateContact(parameter, newValue)

    }

    deleteContact(contactId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("admin cannot delete contacts")
            }
            let contacttobedelete = this.findContact(contactId)
            contacttobedelete.isActive = false
            // this.contacts.splice(contactId,1)
            return contacttobedelete
        } catch (error) {
            return error
            
        }
    }

    createContactDetails(contactId,typeOfContactDetails,number){
        if(this.isAdmin){
            return new UnauthorizedError("Admin cannot access details")
        }
        let newCD = this.findContact(contactId)
        if(newCD === null){
            return 'not found'
        }
        newCD.createContactDetails(typeOfContactDetails,number)
        return newCD   
    }

    getContactDetails(contactId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("Admin cannot get contact details")
            }
            if(!this.isActive){
                throw new UnauthorizedError("not active")
            }
            let contactDetailsToGet = this.findContact(contactId)
            return contactDetailsToGet.getContactDetails() 
        } catch (error) {
            return error
        }


    }

    updateContactDetails(contactId,detailsId,parameter,newValue){
        if(this.isAdmin){
            throw new UnauthorizedError('Admin cannot update contact details')
        }
        let detailsToBeUpdated = this.findContact(contactId)
        if (detailsToBeUpdated == null) {
            throw new NotFoundError("Contact details Not Found")
        }
        return detailsToBeUpdated.updateContactDetails(detailsId, parameter,newValue)

    }

    deleteContactDetails(contactId,detailsId){
        if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot delete contact details")
        }
        let detailstobedeleted = this.findContact(contactId)
        if(detailstobedeleted == null){
            throw new NotFoundError("contact not found")
        }
        return detailstobedeleted.deleteContactDetails(detailsId)
    }

}
module.exports = User
