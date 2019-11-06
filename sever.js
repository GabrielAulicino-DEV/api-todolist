const express = require('express')
const bodyParser = require('body-parser')
const mongodb= require("./database/index")
const UserController = require('./controller/userController')
const TarefaController = require('./controller/tarefaController')
const jwt = require("express-jwt")
const constants= require("./constant/constant")
const app = express()
const cors= require("cors")

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8000;


app.get('/', (req, res)=>{
    return res.send("Hello")
})

app.use(jwt({secret:constants.jwtSecret}).unless({path:["/user/create",'/user/login']}))


app.post('/user/create',UserController.createUserController)
app.post('/user/login', UserController.loginUserController)

app.delete('/user/:id',UserController.deleteUserController)
app.get('/users', UserController.getUsers)

app.get('/email/:email', UserController.getUserEmailController)

app.put("/tarefa/:id", TarefaController.updateTarefaController)
app.delete("/tarefa/:id", TarefaController.deleteTarefaController)
app.get('/tarefa/:id', TarefaController.getUserController)
app.get('/tarefa/', TarefaController.getUserController)

app.get('/umaTarefa/:id', TarefaController.getUmaTarefaController)
app.post('/tarefa', TarefaController.createTarefaController)

app.listen(port, ()=>{
    console.log(`listen port ${port}`)
    mongodb()
})