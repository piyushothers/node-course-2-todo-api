const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js');

jwt.sign,
jwt.verify

var data = {
    id:10
}
var token = jwt.sign(data,'123abc');
console.log(token)

var decoded = jwt.verify(token , '123abc');
console.log(decoded)
// var message = 'I am user number 3';

// var hash = SHA256(message).toString()

// console.log(`Message : ${message}`);
// console.log(`Hash : ${hash}`);

// var data = {
//     id:4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// // token.data.id = 5 ; 

// // token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log(`json was not changed`)
// }
// else{
//     console.log(`json was changed , do not trust`)
// }