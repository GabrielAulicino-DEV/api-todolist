const Tarefa = require('../models/tarefaModel')
const passworMiddaler = require('../middweare/passwordMiddawre')
const jwt = require('jsonwebtoken')
const constant = require("../constant/constant")

const CreateTarefa = async (titulo, subtitulo, descricao, id) => {
    try {
        if (!titulo || !subtitulo || !descricao) {
            return Promise.reject({ error: "titulo, subtitulo e descricao são necessários.", status: 400 })
        }

        const tarefa = await Tarefa.create({ titulo: titulo, subtitulo: subtitulo, descricao: descricao, user: id })

        return Promise.resolve({ data: { titulo: tarefa.titulo, subtitulo: tarefa.subtitulo, descricao: tarefa.descricao }, message: "sucess create tarefa", status: 200 })
    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }

}

const updateTarefa = async (titulo, subtitulo, descricao, id, user) => {
    try {
        console.log(id,user,titulo,subtitulo,descricao)
        if (titulo == undefined || subtitulo == undefined || descricao == undefined || !id || !user) {
            return Promise.reject({ error: "titulo, subtitulo e descricao são necessários.", status: 400 })
        }
        const tarefa = await Tarefa.updateOne({ _id: id, user: user }, { titulo: titulo, subtitulo: subtitulo, descricao: descricao })
        return Promise.resolve({ data: tarefa, status: 200 })
    }
    catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

const deleteTarefa = async (id) => {
    try {
        const deletarTarefa = await Tarefa.deleteOne({ _id: id })
        return Promise.resolve({ data: deletarTarefa, message: "Tarefa deletada.", status: 200 })

    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

const getUserTarefa = async (user) => {
    try {
        const gettarefa = await Tarefa.find({ user: user }, { titulo: 1, subtitulo:1 })
        return Promise.resolve({ data: gettarefa, message: "Tarefas founded", status: 200 })
    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

const getUmaTarefa = async (id) => {
    try {
        const getUmaTarefa = await Tarefa.findOne({ _id: id })
        return Promise.resolve({ data: getUmaTarefa, message: "Tarefas founded", status: 200 })
    } catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

module.exports = {
    createTarefa: CreateTarefa,
    updateTarefa: updateTarefa,
    delete: deleteTarefa,
    getUserTarefa: getUserTarefa,
    getUmaTarefa: getUmaTarefa
}