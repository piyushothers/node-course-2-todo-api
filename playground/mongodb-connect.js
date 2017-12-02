//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
    console.log('Unable to connect to mongo db server')
    return ;
}
console.log('successfully connected to mongo server');
db.collection('Todos').insertOne({text:'Todo something',completed:false},(err,res)=>{
    if(err){
        console.log('unable to insert todo',err);
        return;
    }
    console.log(JSON.stringify(res.ops))
})

// db.collection('Users').insertOne({name:'Piyush',age:29,location:'Pune'},(err,res)=>{
//     if(err){
//         console.log('unable to insert User',err);
//         return
//     }
//     console.log(JSON.stringify(res.ops[0]._id.getTimestamp()))
// })
db.close(); 
})