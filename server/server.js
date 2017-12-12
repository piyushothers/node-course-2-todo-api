
var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo.js')
var {User} = require('./models/users.js')

var {ObjectID} = require('MongoDB')
var express = require('express')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
    console.log(req.body)
    var todo = new Todo({
        text : req.body.text
    }) ; 

    todo.save().then((doc)=>{
        res.send(doc)
    },(err)=>{
        res.status(400).send(err)
    })
}) ; 

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(err)
    })
})

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("id not valid")
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send({"error": "no Todo found with that ID"})
        }
        return res.send({todo})
    })    
    
})

app.listen(3000,()=>{
    console.log('started server on port 3000')
})

module.exports = {app}