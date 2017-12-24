const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo')
const {ObjectID} = require('mongodb')
const {populateTodos,populateUsers,users,todos} = require('./seed/seed')
const {User} = require('./../models/users')
beforeEach(populateTodos)
beforeEach(populateUsers)


describe('POST/todos', () => {
    it('should create a new todo ', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                Todo.find({text}).then((res) => {
                    expect(res.length).toBe(1);
                    expect(res[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    });

    it('should not create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done()
                }).catch((e) => done(e))
            })
    })
})

describe ('Get /todos',()=>{
    it('should get all todos',(done)=>{
        request(app).get('/todos').expect(200).
        expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
}) ; 

describe ('GET /todos/:id',()=>{
    it('should return a todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    });

    it('should return a 404 if todo not found',(done)=>{
        request(app)
        .get(`/todos/${new ObjectID()}`)
        .expect(404)
        .end(done)
    });

    it('should return a 404 if object id is not valid',(done)=>{
        request(app)
        .get(`/todos/abcd`)
        .expect(404)
        .end(done)
    }) ; 

    
})

describe('GET /users/me',()=>{
    it('should return a user if authenticated' , (done)=>{
        request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString())
        })
        .expect((res)=>{
            expect(res.body.email).toBe(users[0].email)
        })
        .end(done);
    })

    it('should return 401 if user is not authenticated' , (done)=>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({})
        })
        .end(done)
    })
});

describe ('POST /users',()=>{
    it('should create a user',(done)=>{
        let email = 'email@email.com'
        let password = '1223aldsj';
        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email)
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user)=>{
                expect(user).toBeTruthy();
                expect(user.password).not.toBe(password);
                done()
            })
            .catch(done);
        })
    }) ;

    it ('should return a validation error if fields are invalid',(done)=>{
        request(app)
        .post('/users')
        .send({email:'abcabc',password:''})
        .expect(400)
        .end(done);
    }) ;

    it('should not create user if email is in use ',(done)=>{
        let email = users[0].email;
        request(app)
        .post('/users')
        .send({email,password:'12334234234'})
        .expect(400)
        .end(done)
    })
})