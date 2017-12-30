
var { mongoose } = require('./db/mongoose.js')
var { Todo } = require('./models/todo.js')
var { User } = require('./models/users.js')
var {_} = require('lodash')
var { ObjectID } = require('MongoDB')
var express = require('express')
var bodyParser = require('body-parser')
var {authenticate} = require('./middleware/authenticate')

var app = express();
const PORT = process.env.port || 3000;
app.use(bodyParser.json())
app.post('/todos', (req, res) => {
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("id not valid")
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({ "error": "no Todo found with that ID" })
        }
        return res.send({ todo })
    })

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    console.log("id to delete ",id)
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        return res.status(200).send({todo})

    })
        .catch((err) => {
            console.log(err)
            return res.status(400).send();
        })
}) ;



app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
})

app.patch('/todos/:id', (request, response) => {
    let id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);
    console.log(body)
    if (!ObjectID.isValid(id)) {
        return response.status(404).send("id not valid")
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
    console.log(`id:${id}`)
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, { new: true }).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        res.send({ todo })
    })
        .catch((e) => {
            response.status(400).send({e})
        })

});
app.post('/users',(req,res)=>{
var {email,password} = _.pick(req.body,['email','password']);
var user = new User({email,password});
user.save(user).then(()=>{
    return user.generateAuthToken()
}).then((token)=>{
    res.header('x-auth',token).send(user)
}).
catch(e => {
    return res.status(400).send(e) 
})
});

app.post('/users/login',(req,res)=>{
    var {email,password} = _.pick(req.body,['email','password']);
    User.findByCredentials(email,password).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return user.generateAuthToken().then((token)=>{
            return res.header('x-auth',token).send(user);
        })
    }).catch((e)=>{
        return   res.status(400).send();
    })
    
}) ; 

app.listen(PORT, () => {
    console.log(`started server on port ${PORT}`)
})

module.exports = { app }