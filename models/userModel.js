const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String, required:true},
    email:{type: String, unique: true, required:true},
    password:{type: String, required:true},
})


module.exports = mongoose.model('User', userSchema)