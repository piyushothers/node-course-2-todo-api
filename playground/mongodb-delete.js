const {MongoClient,ObjectID} = require('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('unable to connect to mongodb server');
        return;
    }
    console.log('successfully connected to mongodb ');

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Lunch'}).then((res)=>{
    //     console.log(res)
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({text:'Lunch'}).then((res)=>{
    //     console.log(res)
    // },(err)=>{
    //     console.log('unable to delete ', err )
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
    //     console.log(res)
    // })

    // delete many by name 
    db.collection('Users').deleteMany({name:'Piyush'}).then((res)=>{
        console.log(res)
    },(err)=>{
        console.log('called with error')
        if(err){
            console.log('unable to delete ')
        }
    })
})