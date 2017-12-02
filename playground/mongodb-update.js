const { MongoClient, ObjectId } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('unable to connect to TodoApp ', e)
        return;
    }
    console.log('successfully connected to TodoApp')
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId('5a227ffd0a4a391088663673')
    // },
    //     {
    //         $set:{
    //             completed:true
    //         }
    //     },{
    //         returnOriginal:false
    //     }).then((result)=>{
    //         console.log(result)
    //     });

    db.collection('Users').findOneAndUpdate({
        name:'Viraj'
    },{
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result)
    })
})