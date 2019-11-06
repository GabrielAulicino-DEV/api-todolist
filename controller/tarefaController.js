const Tarefa = require('../models/tarefaModel')
const TarefaService = require('../service/tarefa.service')
const jwt =require("../middweare/getToken")

const createTarefaController = async (req,res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)
        console.log(token)
        const createTarefa = await TarefaService.createTarefa(req.body.titulo, req.body.subtitulo, req.body.descricao,token._id)
        res.send({data:createTarefa.data,message:createTarefa.message}).status(createTarefa.status)
    }catch(error){
        console.log("ERROR")
        res.status(400).send(error.error)
    }
}


const updateTarefaController = async (req,res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)
        const updateTarefa = await TarefaService.updateTarefa(req.body.titulo, req.body.subtitulo, req.body.descricao,req.params.id,token._id)
        res.send({data:updateTarefa.data}).status(updateTarefa.status)
    }catch(error){
        console.log("ERROR")
        res.status(400).send(error.error)
    }
}

const deleteTarefaController = async(req, res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)

        const deleteTarefa = await TarefaService.delete(req.params.id, token._id)
        res.send({data:deleteTarefa.data, message:deleteTarefa.message}).status(deleteTarefa.status)
    }catch(error){
        console.log(error)
        res.status(400).send(error.error)
    }
}

const getUserController = async(req,res)=>{
    try{
        const userToken= jwt.decodeJWT(req.headers.authorization)
        console.log(userToken)
        const getUser = await TarefaService.getUserTarefa(userToken._id)
        res.send({data:getUser.data, message:getUser.message}).status(getUser.status)
    }catch(error){
        console.log(error)
        res.status(400).send(error.error)
    }
}

const getUmaTarefaController = async(req,res)=>{
    try{
        const getUmaTarefaController = await TarefaService.getUmaTarefa(req.params.id)
        res.send({data:getUmaTarefaController.data, message:getUmaTarefaController.message}).status(getUmaTarefaController.status)
    }catch(error){
        console.log(error)
        res.status(400).send(error.error)
    }
}

module.exports={
    createTarefaController,
    updateTarefaController,
    deleteTarefaController,
    getUserController,
    getUmaTarefaController
 
}