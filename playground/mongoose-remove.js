const {ObjectID} = require('MongoDB')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')

// Todo.remove({}).then((result)=>{
//     console.log(result)
// });

// //Todo.findOneAndRemove()
// Todo.findByIdAndRemove({}