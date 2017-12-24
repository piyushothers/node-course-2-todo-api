const { Todo } = require('./../../models/todo')
const {ObjectID} = require('mongodb')
const jwt  = require('jsonwebtoken')
const {User} = require('./../../models/users')

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id  : new ObjectID(),
    text: 'First test todo' },
{ 
    _id : new ObjectID(),
    text: 'Second test todo' }] ;

const users = [{
    _id : userOneId , 
    email : 'userOne@emailId.com',
    password : 'user1Password',
    tokens:[
        {
            access : 'auth',
            token : jwt.sign({_id : userOneId , access : 'auth'},'abc123').toString()
        }
    ]
},{
    _id:userTwoId ,
    email: 'userTwo@emailId.com',
    password : 'user2Password'
}]


const populateTodos = (done) => {
     
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos)
    } ).then(()=>done());
}

const populateUsers = (done) => {
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne,userTwo])
    }).then(()=>done()).catch((e)=> {
        console.error(e);
        done();
    });
}

module.exports = {populateTodos,populateUsers,users,todos}