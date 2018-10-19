// [{
//   id: '/#12'
//   name:
//   room:
// }]

//es6 classes
//addUser(id name room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor(){
this.users = [];
  }
  addUser (id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
}



// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age}`;
//   }
// }
//
// var person = new Person('Andrew', 25);
// var description = me.getUserDescription();

module.exports = {Users};
