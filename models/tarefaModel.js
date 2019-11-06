const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarefaSchema = new Schema({
    titulo:{type: String, required:true},
    subtitulo:{type: String, required:true},
    descricao:{type: String, unique: false, required:true},
    user:{type:Schema.Types.ObjectId,required:true, ref:'User'}
    
})


module.exports = mongoose.model('Tarefa', tarefaSchema)