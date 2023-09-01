const User = require("./User");
const Contact = require("./Contact")


let admin = User.newAdmin("akshata","potale")

let user1 = admin.newUser("abc", "def")
let user2 = admin.newUser("ghi", "jkl")
let user3 = admin.newUser("mno","pqr")
let user4 = admin.newUser("stu","vwx")

console.log(admin);
admin.updateUsers(1,"firstname","mno");
admin.deleteUser(4);

admin.getAllUsers();
user1.createContact("piyush","potale");
user2.createContact("mahesh","potale");
user3.createContact("sunita","p")



console.log(user1.getContacts());
console.log(user2.getContacts());

user3.deleteContact(2);
console.log(user3.getContacts());

console.log(user1.createContactDetails(0,"work","9987076830"));
console.log(user1.createContactDetails(0,"home","8956478569"));
console.log(user2.createContactDetails(1,"office","7895468975"));
// console.log(user1.getContactDetails(0));
console.log(user1.updateContactDetails(0,0,"number","7869656456"));
console.log(user2.getContactDetails(1));


// console.log(user2.getContactDetails(1));
// console.log(user1.deleteContactDetails(0,0));
// console.log(user1.getContactDetails(0));