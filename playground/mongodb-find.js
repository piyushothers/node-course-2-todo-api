//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
if(err){
    console.log('Unable to connect to mongo db server')
    return ;
}
console.log('successfully connected to mongo server');

// db.collection('Todos').find({_id:
//         new ObjectID("5a227e04e887cd1e90e9d672")
// }).toArray().then((docs)=>{
//     console.log('Todos');
//     console.log(JSON.stringify(docs,undefined,1))
// },(err)=>{
//     console.log('unable to fetch todos')
// })
//
// db.collection('Todos').find().count().then((count)=>{
// console.log('Todos');
// console.log(`Todo count  : ${count}`)
// },(err)=>{
// console.log('unable to fetch todos')
// })

db.collection('Users').find({name:'Piyush'}).count().then((count)=>{
    console.log(`${count} records found `)
})
//db.close(); 
})